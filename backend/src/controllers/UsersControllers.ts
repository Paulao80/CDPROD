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
import Mail from '../services/Mail';

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
            PasswordConfimation: Yup.string().test('passwords-match', 'As senhas não conferem!', function(value){
                return this.parent.Password === value
            }),
            FotoPath: Yup.string().notRequired()
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
    },
    async forgotSendEmail(request: Request, response: Response){
        const validation = request.body;

        const schema = Yup.object().shape({
            Email: Yup.string().email('O E-mail está incorreto').required('O E-mail é obrigatório'),
            Link: Yup.string().required('O Link é obrigatório')
        });

        await schema.validate(validation, {
            abortEarly: false
        });

        const {Email, Link} = validation;

        const UsersRepository = getRepository(UserClass);

        const user = await UsersRepository.createQueryBuilder("U")
        .where("U.Email = :email", {
            email: Email
        })
        .getOne();

        if(!user) return response.status(404).json({message: 'Usuário não encontrado'});

        const secretKey = process.env.TOKEN_SECRET_KEY;

        if(!secretKey) return response.status(400).json({message: 'Falha na chave secreta'});

        const dataToken: DataToken = {
            _id: user.UserId,
            _name: user.Name
        }

        const Token = jwt.sign(dataToken, secretKey,{
            expiresIn: 43200
        });

        const mailList = [
            {
                name: user.Name,
                address: user.Email
            }
        ];

        Mail.to = mailList;
        Mail.subject = 'Esqueceu a Senha';
        Mail.message = `<p>Olá <strong>${user.Name}</strong></p>`
            + `<p>Você está recebendo este e-mail porque você pediu uma nova senha para sua conta na Aplicação CDTR.</p>`
            + `<p>Se não foi você quem solicitou, por favor, ignore este e-mail, e sua senha continuará a mesma.</p>`
            + `Para mudar a senha de sua conta, clique no link a seguir:<br/><br/>`
            + `<a href="${Link}?Code=${Token}">Clique Aqui</a>`;

        const result = Mail.sendMail();

        result.then((res) => {
            return response.status(200).json({message: 'E-mail enviado'});
        }).catch((err) => {
            return response.status(400).json({message: 'E-mail não enviado'});
        });
    },
    async resetPassword(request: Request, response: Response){
        const validation = request.body;

        const schema = Yup.object().shape({
            Token: Yup.string().required('O Token é obrigatório'),
            Password: Yup.string().min(8,"Senha deve possuir no Minimo 8 caracteres").required('Senha é Obrigatória'),
            PasswordConfirmation: Yup.string().test('passwords-match', 'As senhas não conferem!', function(value){
                return this.parent.Password === value
            })
        });

        await schema.validate(validation, {
            abortEarly: false
        });

         const secretKey = process.env.TOKEN_SECRET_KEY;

         if(!secretKey) return response.status(400).json({message: 'Falha na chave secreta!'});

         const {
             Token,
             Password
            } = validation;

         if(!Token) return response.status(400).json({message: 'Token invalido!'});

         try{
            const userVerified = jwt.verify(Token as string, secretKey) as DataToken;
            const UsersRepository = getRepository(UserClass);
            let user = await UsersRepository.findOne(userVerified._id);
   
            if(!user) return response.status(404).json({message: 'Usuário não encontrado'});
           
            user.Password = await bcrypt.hash(Password as string, 10);
   
            await UsersRepository.save(user);

            const mailList = [
                {
                    name: user.Name,
                    address: user.Email
                }
            ];
    
            Mail.to = mailList;
            Mail.subject = 'Senha Alterada';
            Mail.message = `<p>Olá <strong>${user.Name}</strong></p>`
                + `<p>Sua senha foi alterada na aplicação CDTR. Caso não estiver feito essa solicitação, entre em contato com desenvolvimento.</p>`;

            Mail.sendMail();
   
            return response.status(200).json({message: 'Senha Alterada'});
         }catch(error){
            return response.status(400).json({message: 'Token invalido'});
         }

    }
};