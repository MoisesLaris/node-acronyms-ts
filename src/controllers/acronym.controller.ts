import { Request, Response } from 'express';
import { AppDataSource } from './../database/index';
import { Acronym } from '../database/entity/acronym';
import { ILike } from "typeorm";
import { ResponseModel } from './../models/response';

const acronymRepository = AppDataSource.getRepository(Acronym);

export const getAcronym = async (req: Request, res: Response) => {
    let search = req.query.search as string;
    let { from, limit } = req.query;
    if (!from) from = '0';
    if (!limit) limit = '10';
    if (!search) res.status(403).send('Search parameter is required.');

    // ILIKE operator performs case insensitive queries.
    const [acronyms, total] = await acronymRepository.findAndCount({
        where: {
            acronym: ILike(`%${search.toLowerCase().trim()}%`),
        },
        take: parseInt(limit as string),
        skip: parseInt(from as string),
    });

    res.send({ acronyms, total });
}

export const getAcronymById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const acronym = await acronymRepository.findOneById(id);

        if (!acronym) {
            return res.status(404).send({ message: `Acronym not found with the id ${id}.` } as ResponseModel);
        }
        return res.send({ acronym });
    } catch (error) {
        return res.status(403).send({ error });
    }
}

export const getRandomAcronyms = async (req: Request, res: Response) => {
    const amount = req.query.amount as string;
    let numberOfAcronyms: number = 10;

    if (amount && amount.trim()) {
        numberOfAcronyms = parseInt(amount.trim());
        if (isNaN(numberOfAcronyms)) {
            return res.status(404).send({ error: 'Amount query param must be a number.' });
        }
    }

    const acronyms = await AppDataSource.createQueryBuilder(Acronym, "acronym")
        .orderBy('RANDOM()')
        .take(numberOfAcronyms)
        .getMany();

    return res.send({ numberOfAcronyms, acronyms });
}

export const getInfo = (req: Request, res: Response) => {
    const info = `
    <div>
        <h4>Welcome to the World Texting Foundation, also known as WTF.</h4>

        <p>Use an Authorization header to work with your own data:</p>
        <p>i.e: fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})</p>
      
        <p>The following endpoints are available:</p>
        
        <ul>
            <li>GET /acronym?from=50&limit=10&search=:search
                <ul>
                    <li>search is required</li>
                    <li>from is defaulted by 10</li>
                    <li>limit is defaulted by 10</li>
                </ul>
            </li>
            <li>GET /acronym/info</li>
            <li>GET /acronym/:id</li>
            <li>GET /acronym/random?amount
                <ul>
                    <li>amount is defaulted by 10</li>
                </ul>
            </li>
            <li>POST /acronym</li>
            <li>PUT /acronym/:acronym</li>
            <li>DELETE /acronym/:acronym</li>
        </ul>
    </div>

    `;

    res.send(info);
}

export const postAcronym = async (req: Request, res: Response) => {
    const { acronym, definition } = req.body;

    if (!acronym || !acronym.trim()) {
        return res.status(403).send('Acronym must not be an empty string.');
    }

    const acronymToCreate = new Acronym({
        acronym: acronym.trim(),
        definition: definition.trim(),
    });

    try {
        const acronymCreated = await acronymRepository.save(acronymToCreate);
        res.send({ message: 'Acronym created succesfully.', acronym: acronymCreated } as ResponseModel);
    } catch (error) {
        res.status(403).send({ error } as ResponseModel);
    }
}

export const updateAcronym = async (req: Request, res: Response) => {
    const { acronym } = req.params;
    const { definition } = req.body;

    if (!acronym || !acronym.trim()) {
        return res.status(403).send({ error: 'Acronym must not be an empty string.' } as ResponseModel);
    }

    if (!definition || !definition.trim()) {
        return res.status(403).send({ error: 'Definition must not be an empty string.' } as ResponseModel);
    }

    const properties = await acronymRepository.findOne({
        where: {
            acronym: ILike(acronym.trim())
        }
    });

    if (!properties) {
        return res.status(403).send({ error: 'Acronym was not found.' } as ResponseModel);
    }

    const updatedAcronym = await acronymRepository.save({
        ...properties,
        definition: definition.trim(),
    });

    if (!updatedAcronym) {
        return res.status(403).send({ error: 'Definition was not updated.' } as ResponseModel);
    }

    return res.send({
        message: `Acronym '${properties.acronym}' was sucessfully updated.`,
        acronym: updatedAcronym,
    } as ResponseModel);
}

export const deleteAcronym = async (req: Request, res: Response) => {
    const { acronym } = req.params;

    if (!acronym || !acronym.trim()) {
        return res.status(403).send({ error: 'Acronym must not be an empty string.' } as ResponseModel);
    }

    try {
        const deletedAcronym = await acronymRepository.delete({
            acronym: ILike(acronym)
        });
        if (!deletedAcronym || !deletedAcronym.affected || deletedAcronym.affected <= 0) {
            return res.send({ message: `Acronym '${acronym}' was not found.` } as ResponseModel);
        }
    } catch (error) {
        return res.status(403).send({ message: `Acronym '${acronym}' was not deleted.`, error } as ResponseModel);
    }


    return res.send({ message: `Acronym '${acronym}' succesfully deleted.` } as ResponseModel);
}