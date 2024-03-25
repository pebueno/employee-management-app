import express from "express";
import * as dotenv from "dotenv";

import { AppDataSource } from "./data-source";
// import { Employee } from "./entity/Employee";

dotenv.config();
const app = express();

const PORT = process.env.DB_PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        AppDataSource.initialize();
        console.log('Connected to the Database');
    } catch (error) {
        console.log(error);
    }
});

// AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new employee into the database...")
    // const employee = new Employee()
    // employee.firstName = "Timber"
    // employee.lastName = "Saw"
    
    // await AppDataSource.manager.save(employee)
    // console.log("Saved a new employee with id: " + employee.id)

    // console.log("Loading employees from the database...")
    // const employees = await AppDataSource.manager.find(Employee)
    // console.log("Loaded employees: ", employees)

    // console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
