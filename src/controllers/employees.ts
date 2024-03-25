import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { FindOneOptions } from 'typeorm';

import Employee from "../entity/Employee";

interface EmployeeType {
    id: number;
    firstName: string;
    lastName: string;
    department: string;
    hireDate: Date;
    phone: number;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export const CreateEmployee = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, department, hireDate, phone, address } = req.body;

        const newEmployee = new Employee();
        newEmployee.firstName = firstName;
        newEmployee.lastName = lastName;
        newEmployee.department = department;
        newEmployee.hireDate = new Date(hireDate);
        newEmployee.phone = phone;
        newEmployee.address = address;

        const employeeRepository = AppDataSource.getRepository(Employee);
        await employeeRepository.save(newEmployee);

        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

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

const findEmployeeById = async (id: string): Promise<EmployeeType> => {
    const employeeId: number = parseInt(id, 10);
    const options: FindOneOptions<Employee> = {
        where: { id: employeeId },
    };
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee: Employee | null = await employeeRepository.findOne(options);
    
    if (!employee) {
        throw new Error("Employee not found");
    }
    
    return employee;
};

export const GetEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee: Employee | null = await findEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({ employee });
    } catch (error) {
        console.error("Error retrieving employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const UpdateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await findEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        // Update employee properties
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.department = req.body.department;
        employee.hireDate = new Date(req.body.hireDate);
        employee.phone = req.body.phone;
        employee.address = req.body.address;
        const employeeRepository = AppDataSource.getRepository(Employee);
        await employeeRepository.save(employee);
        res.status(200).json({ message: "Employee updated successfully", employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const DeleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await findEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        const employeeRepository = AppDataSource.getRepository(Employee);
        await employeeRepository.remove(employee);
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
