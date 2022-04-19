import { Request, Response } from 'express';
import { AppDataSource } from './../database/index';
import { Acronym } from '../database/entity/acronym';
import {Like} from "typeorm";

const acronymRepository = AppDataSource.getRepository(Acronym);


export const getAcronym = async (req: Request, res: Response) => {
    console.log('hola');
    let {from, limit, search} = req.query;
    if (!from) from = '0';
    if (!limit) limit = '10';
    if (!search) res.status(400).send('Search parameter is required.');

    // Database request;
    const [acronyms, total] = await acronymRepository.findAndCount({
        where:{
            acronym: Like(`%${search}%`),
        },
        take: parseInt(limit as string),
        skip: parseInt(from as string),
    });
    // Reponse

    res.send({acronyms, total});
}

export const postAcronym = (req: Request, res: Response) => {
    const {acronym, definition}: Acronym = req.body
    
    if (!acronym.trim()) {
        res.status(400).send('Acronym must not be an empty string.');
    }

    //Database Store

    // Response
}
