import { Request, Response } from 'express';
import { AppDataSource } from './../database/index';
import { Acronym } from '../database/entity/acronym';
import {ILike} from "typeorm";

const acronymRepository = AppDataSource.getRepository(Acronym);


export const getAcronym = async (req: Request, res: Response) => {
    let search = req.query.search as string;
    let {from, limit} = req.query;
    if (!from) from = '0';
    if (!limit) limit = '10';
    if (!search) res.status(400).send('Search parameter is required.');

    // ILIKE operator performs case insensitive queries.
    const [acronyms, total] = await acronymRepository.findAndCount({
        where: {
            acronym: ILike(`%${search.toLowerCase().trim()}%`),
        },
        take: parseInt(limit as string),
        skip: parseInt(from as string),
    });

    res.send({acronyms, total});
}

export const postAcronym = async (req: Request, res: Response) => {
    const {acronym, definition}: Acronym = req.body;
    
    if (!acronym.trim()) {
        res.status(400).send('Acronym must not be an empty string.');
    }

    const acronymToCreate = new Acronym({
        acronym: acronym.trim(),
        definition: definition.trim(),
    });

    try {
        const acronymCreated = await acronymRepository.create(acronymToCreate);
        res.send({message: 'Acronym created succesfully.', acronym: acronymCreated});
    } catch (error) {
        res.status(400).send('Error while creating acronym.');
    }
}
