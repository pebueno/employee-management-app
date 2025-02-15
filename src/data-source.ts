import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import Employee from './entity/Employee';
import Department from './entity/Department';

dotenv.config();

export const AppDataSource = new DataSource ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME, 
    synchronize: true,
    logging: false,
    entities: [Employee, Department],
    migrations: ["./migration/**.js"],
    subscribers: [],
});