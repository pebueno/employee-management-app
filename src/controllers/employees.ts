import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";

import Employee from "../entity/Employee";

export const GetAllEmployees = async (req: Request, res: Response) => {
    try {
        const employeeRepository = AppDataSource.getRepository(Employee);
        const employees = await employeeRepository.find();
        console.log("Loaded employees: ", employees);
        res.status(200).json({ employees });

    } catch (error) {
        console.error("Error retrieving employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const CreateEmployee = async (req: Request, res: Response) => {
    try {
        // Create a new instance of the Employee entity with sample data for mock purposes
        const newEmployee = new Employee();
        newEmployee.firstName = "John";
        newEmployee.lastName = "Doe";
        newEmployee.department = "IT";
        newEmployee.hireDate = new Date('2022-03-22');
        newEmployee.phone = 1234567890;
        newEmployee.address = "123 Main St";

        const employeeRepository = AppDataSource.getRepository(Employee);
        await employeeRepository.save(newEmployee);

        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}