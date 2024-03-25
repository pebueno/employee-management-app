import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import employeesRouter from "./routes/employees";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/employees', employeesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        AppDataSource.initialize();
        console.log('Connected to the Database');
    } catch (error) {
        console.log(error);
    }
});