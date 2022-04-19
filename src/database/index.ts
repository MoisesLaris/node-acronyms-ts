import "reflect-metadata"
import { DataSource } from "typeorm"
import { Acronym } from "./entity/acronym";
import { mapAndTransformJson } from "../utils/utils";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "acronym",
    entities: [Acronym],
    synchronize: true,
    logging: false,
});

export const initializeConnectionDatabase = async () => {
    try {
        await AppDataSource.initialize();
    } catch (error) {
        throw error;
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