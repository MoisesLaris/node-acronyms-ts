import "reflect-metadata"
import { DataSource } from "typeorm"
import { Acronym } from "./entity/acronym";
import { mapAndTransformJson } from "../utils/utils";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Acronym],
    synchronize: true,
    logging: false,
});

export const initializeConnectionDatabase = async () => {
    let retries = 5;
    while(retries) {
        try {
            await AppDataSource.initialize();
            break;
        } catch (error) {
            console.log(error);
            retries--;
            console.log(`retries left ${retries}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

// This function must be called after we initialize the connection with the database.
export const syncAndPopulate = async () => {
    const acronyms = mapAndTransformJson();
    const mapAcronymsToSave: Acronym[] = acronyms.map((data: {acronym: string, definition: string}) => {
        return new Acronym(data);
    });
    await AppDataSource.synchronize(true);
    await AppDataSource.manager.save(mapAcronymsToSave);
}