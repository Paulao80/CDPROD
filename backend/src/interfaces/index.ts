import { Request } from 'express';
import User from '../models/User';

export interface DataToken {
    _id: number; 
    _name: string;
}

export interface RequestWithUser extends Request{
    user?: User;
}