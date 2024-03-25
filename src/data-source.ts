import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME, 
    synchronize: true,
    logging: false,
    entities: ["./entity/*.ts"],
    migrations: ["./migrations/**.js"],
    subscribers: [],
});