import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ResponseModel } from "../models/response";

export const getToken = (req: Request, res: Response) => {
    const email = req.param('email');
    const secret = process.env.SECRET_KEY;
    console.log(email)
    if (!email) {
        return res.status(403).send({error: 'Email must be provided as query param.'} as ResponseModel);
    }
    if(!secret) {
        return res.status(403).send({error: 'Secret for JWT must me defined.'} as ResponseModel);
    }
    console.log(secret);
    try {
        const token = jwt.sign({email}, secret, {expiresIn: '1h'});
        return res.send({token, message: 'Use this token in your headers request.'} as ResponseModel);
    } catch (error) {
        return res.status(403).send({error: 'Error while creating JWT.'} as ResponseModel);
    }
}