import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { GetAllEmployees, CreateEmployee } from './controllers/employees';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', GetAllEmployees);
app.get('/create', CreateEmployee); //Mock create

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        AppDataSource.initialize();
        console.log('Connected to the Database');
    } catch (error) {
        console.log(error);
    }
});