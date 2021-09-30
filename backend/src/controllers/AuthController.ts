import { Response, NextFunction} from 'express';
import {RequestWithUser, DataToken} from '../interfaces';
import {getRepository} from 'typeorm';
import {default as User} from '../models/User';
import jwt from 'jsonwebtoken';

export default {
    async verify (request: RequestWithUser, response: Response, next: NextFunction) {
        const token = request.header('authorization-token');
        if(!token) return response.status(401).json({ Message: "Access Denied"});
    
        try {
            if(process.env.TOKEN_SECRET_KEY){
                const userVerified = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as DataToken;
                const UsersRepository = getRepository(User);
                const user = await UsersRepository.findOneOrFail(userVerified._id);
                request.user = user;
                next();
            } 
            else{
                return response.status(400).json({ message: "Failed get token secret key!"});
            }               
        } catch (err) {
            return response.status(401).json(err);
        }
    }
};