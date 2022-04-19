import "reflect-metadata"
import { DataSource } from "typeorm"
import { Acronym } from "./entity/acronym";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",
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
export const syncAndPopulate = (data: Acronym[]) => {
    const acronym = new Acronym();
}