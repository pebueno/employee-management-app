import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FindOneOptions } from 'typeorm';
import Employee from '../entity/Employee';
interface EmployeeType {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    hireDate: Date;
    phone: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export const CreateEmployee = async (req: Request, res: Response) => {
  try {
    let employeeData: EmployeeType | EmployeeType[] = req.body;

    // If a single employee object is received, convert it to an array
    if (!Array.isArray(employeeData)) {
      employeeData = [employeeData];
    }

    // Create an array to store the new employees
    const newEmployees: Employee[] = [];

    // Iterate over each employee data and create new Employee instances
    for (const data of employeeData) {
      const { id, firstName, lastName, department, hireDate, phone, address } = data;
      const newEmployee = new Employee();
      newEmployee.firstName = firstName;
      newEmployee.lastName = lastName;
      newEmployee.department = department;
      newEmployee.hireDate = new Date(hireDate);
      newEmployee.phone = phone;
      newEmployee.address = address;

      newEmployees.push(newEmployee);
    }

    const employeeRepository = AppDataSource.getRepository(Employee);
    await employeeRepository.save(newEmployees);

    res.status(201).json({ message: 'Employees created successfully', employees: newEmployees });
  } catch (error) {
    console.error('Error creating employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const GetAllEmployees = async (req: Request, res: Response) => {
  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employees = await employeeRepository.find();
    console.log('Loaded employees:', employees);
    res.status(200).json({ employees });
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findEmployeeById = async (id: string): Promise<EmployeeType | null> => {
    const employeeId: string = id;
    const options: FindOneOptions<Employee> = {
      where: { id: employeeId },
    };
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee: Employee | null = await employeeRepository.findOne(options);
  
    return employee;
  };
  

export const GetEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await findEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error retrieving employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const UpdateEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id;
    const existingEmployee = await findEmployeeById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const { firstName, lastName, department, hireDate, phone, address } = req.body;
    existingEmployee.firstName = firstName;
    existingEmployee.lastName = lastName;
    existingEmployee.department = department;
    existingEmployee.hireDate = new Date(hireDate);
    existingEmployee.phone = phone;
    existingEmployee.address = address;

    const employeeRepository = AppDataSource.getRepository(Employee);
    await employeeRepository.save(existingEmployee);
    res.status(200).json({ message: 'Employee updated successfully', employee: existingEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const DeleteEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id;
    const employeeRepository = AppDataSource.getRepository(Employee);
    const deleteResult = await employeeRepository.delete(employeeId);
    if (deleteResult.affected === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
