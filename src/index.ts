import { AppDataSource } from "./data-source"
import * as dotenv from "dotenv";
import { Employee } from "./entity/Employee";

dotenv.config();

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new employee into the database...")
    const employee = new Employee()
    employee.firstName = "Timber"
    employee.lastName = "Saw"
    
    await AppDataSource.manager.save(employee)
    console.log("Saved a new employee with id: " + employee.id)

    console.log("Loading employees from the database...")
    const employees = await AppDataSource.manager.find(Employee)
    console.log("Loaded employees: ", employees)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
