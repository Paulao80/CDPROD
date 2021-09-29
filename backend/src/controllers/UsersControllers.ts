import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {default as UserClass} from '../models/User';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

export default {
    async register(request: Request, response: Response){

        const {
            Name,
            User,
            Email,
            Password            
        } = request.body;

        var FotoPath = request.file?.filename;
        var CreatedAt = new Date(Date.now()).toString();

        const data = {
            Name,
            User,
            Email,
            Password: await bcrypt.hash(Password,10),
            FotoPath,
            CreatedAt
        }

        const schema = Yup.object().shape({
            Name: Yup.string().required('Name é Obrigatório'),
            User: Yup.string().required('User é Obrigatório'),
            Email: Yup.string().required('Email é Obrigatório'),
            Password: Yup.string().required('Password é Obrigatório'),
            FotoPath: Yup.string().notRequired(),
            CreatedAt: Yup.date().required('CreatedAt é Obrigatório')
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const UsersRepository = getRepository(UserClass);

        const user = UsersRepository.create(data);

        await UsersRepository.save(user);

        return response.status(201).json(user);
    },
    async login(request: Request, response: Response){
        return response.json({
            message: 'Login!'
        });
    }
};