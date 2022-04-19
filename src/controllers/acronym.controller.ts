import { Request, Response } from 'express';
import { Acronym } from '../models/acronym';

export const getAcronym = (req: Request, res: Response) => {
    let {from, limit, search} = req.query;
    if (!from) from = '0';
    if (!limit) limit = '10';
    if (!search) res.status(400).send('Search parameter is required.');

    // Database request;

    // Reponse
}

export const postAcronym = (req: Request, res: Response) => {
    const {acronym, definition}: Acronym = req.body
    
    if (!acronym.trim()) {
        res.status(400).send('Acronym must not be an empty string.');
    }

    //Database Store

    // Response
}
