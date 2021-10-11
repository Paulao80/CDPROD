import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {default as UserClass} from '../models/User';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import {DataToken} from '../interfaces';
import {RequestWithUser} from '../interfaces';
import UserView from '../views/UserView';
import fs from 'fs';
import path from "path";

export default {
    async register(request: Request, response: Response){

        const validation = request.body;

        var FotoPath = request.file?.filename;
        var CreatedAt = new Date(Date.now()).toString();


        const schema = Yup.object().shape({
            Name: Yup.string().required('Nome é Obrigatório'),
            User: Yup.string().required('Usuário é Obrigatório'),
            Email: Yup.string().email().required('E-mail é Obrigatório'),
            Password: Yup.string().min(8,"Senha deve possuir no Minimo 8 caracteres"),
            FotoPath: Yup.string().notRequired(),
            CreatedAt: Yup.date().required('CreatedAt é Obrigatório')
        });

        await schema.validate(validation, {
            abortEarly: false
        });

        const {
            Name,
            User,
            Email,
            Password            
        } = validation;

        const data = {
            Name,
            User,
            Email,
            Password: await bcrypt.hash(Password,10),
            FotoPath,
            CreatedAt
        };

        const UsersRepository = getRepository(UserClass);

        const user = UsersRepository.create(data);

        await UsersRepository.save(user);

        return response.status(201).json(user);
    },
    async update(request: Request, response: Response){
        const validation = request.body;

        var FotoPath = request.file?.filename;

        const UsersRepository = getRepository(UserClass);

        const schema = Yup.object().shape({
            UserId: Yup.number().required('Id é Obrigatório'),
            Name: Yup.string().required('Nome é Obrigatório'),
            User: Yup.string().required('Usuário é Obrigatório'),
            Email: Yup.string().required('E-mail é Obrigatório'),
            PasswordOld: Yup.string().notRequired().min(8,"Senha deve possuir no Minimo 8 caracteres").test('password-check','A senha não confere!', async function(value){
                const userFind = await UsersRepository.findOne(this.parent.UserId);
                const passwordMatch = value !== undefined && userFind !== undefined ? await bcrypt.compare(value, userFind.Password) : false;
                return value !== undefined ?  passwordMatch : true;
            }),
            PasswordNew: Yup.string().notRequired().min(8,"Senha deve possuir no Minimo 8 caracteres"),
            PasswordNewConfimation: Yup.string().notRequired().test('passwords-match', 'As senhas não conferem!', function(value){
                return this.parent.PasswordNew === value
            })
        });

        await schema.validate(validation, {
            abortEarly: false
        });

        const {
            UserId,
            Name,
            User,
            Email,
            PasswordOld,
            PasswordNew            
        } = validation;        

        const userFind = await UsersRepository.findOne(UserId);

        if(userFind){

            if(FotoPath !== undefined && FotoPath !== null) {                     

                if(userFind.FotoPath !== undefined && userFind.FotoPath !== "" && userFind.FotoPath !== null){    
                    let pathFoto = path.join(__dirname, '..', '..', 'uploads', userFind.FotoPath);
                    if(fs.existsSync(pathFoto)) fs.unlinkSync(pathFoto);
                }
                    
            }

            const data = {
                UserId: parseInt(UserId),
                Name,
                User,
                Email,
                Password: PasswordOld !== undefined ? await bcrypt.hash(PasswordNew,10) : userFind.Password,
                FotoPath: FotoPath !== undefined && FotoPath !== null ? FotoPath : userFind.FotoPath,
                CreatedAt: userFind.CreatedAt
            };  
    
            const user = UsersRepository.create(data);
    
            await UsersRepository.save(user);

            return response.json(UserView.renderLogin(user));
        }
        else{
            return response.status(404).json({ message: 'Usuário não encontrado!'});
        }     
    },
    async login(request: Request, response: Response){
        const {
            EmailOrUser,
            Password
        } = request.body;

        const data = {
            EmailOrUser,
            Password
        };

        const schema = Yup.object().shape({
            EmailOrUser: Yup.string().required('Email é Obrigatório'),
            Password: Yup.string().required('Password é Obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const UsersRepository = getRepository(UserClass);

        const user = await UsersRepository.createQueryBuilder("U")
        .where("U.Email = :email OR U.User = :user", {
            email: EmailOrUser, 
            user: EmailOrUser
        })
        .getOne();

        if(!user) {
            return response.status(400).json({Message: "E-mail ou Senha incorreta!"});
        }
        else{

            const passwordMatch = await bcrypt.compare(Password, user.Password);

            if(!passwordMatch) {
                return response.status(400).json({Message: "E-mail ou Senha incorreta!"});
            }
            else{
                if(process.env.TOKEN_SECRET_KEY){
                    const dataToken: DataToken = {
                        _id: user.UserId,
                        _name: user.Name
                    }
    
                    const token = jwt.sign(dataToken, process.env.TOKEN_SECRET_KEY,{
                        expiresIn: 43200
                    });
    
                    response.header('authorization-token', token);
                    return response.json(UserView.renderLogin(user));
                }
                else{
                    return response.status(400).json({ message: "Falha, entrar em contato com Suporte!"});
                }   
                
            }

        }        
    },
    async show(request: RequestWithUser, response: Response){
        const user = request.user;
        if(user) return response.json(UserView.render(user));

        return response.json({});
    }
};