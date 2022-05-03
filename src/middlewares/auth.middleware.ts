import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('authorization');
    if(!authorization) {
        return res.status(401).send('Autorization must me provided.');
    }
    
    try {
        const token = jwt.verify(authorization, (process.env.SECRET_KEY || ''));
        if(!token) {
            return res.status(401).send('Provided autorization is not valid.');
        }
        return next();
    } catch (error) {
        return res.status(401).send('Error decoding JWT');
    }
}