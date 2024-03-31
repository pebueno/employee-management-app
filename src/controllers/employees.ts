import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FindOneOptions } from 'typeorm';
import Employee from '../entity/Employee';
import Department from '../entity/Department';

interface EmployeeType {
  id: string;
  firstName: string;
  lastName: string;
  departmentId: number;
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

    const newEmployees: Employee[] = [];

    // Iterate over each employee data and create new Employee instances
    for (const data of employeeData) {
      const newEmployee = new Employee();
      
      // Assign employee properties
      newEmployee.firstName = data.firstName;
      newEmployee.lastName = data.lastName;
      newEmployee.hireDate = new Date(data.hireDate);
      newEmployee.phone = data.phone;
      newEmployee.address = data.address;

      // Fetch the department entity based on departmentId
      const departmentRepository = AppDataSource.getRepository(Department);
      const department = await departmentRepository.findOneBy({ id: data.departmentId });

      if (!department) {
        throw new Error(`Department with id ${data.departmentId} not found`);
      }

      // Assign the department to the employee
      newEmployee.department = department;

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
    const employees = await employeeRepository.find({ relations: ['department'] });
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
    relations: ['department']
  };
  const employeeRepository = AppDataSource.getRepository(Employee);
  const employee: Employee | null = await employeeRepository.findOne(options);
  
  return employee ? {
    ...employee,
    departmentId: employee.department.id
  } : null;
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

    const employeeData: EmployeeType = req.body;

    // Update existingEmployee properties with values from employeeData
    Object.assign(existingEmployee, employeeData);

    // Convert hireDate to Date object
    existingEmployee.hireDate = new Date(employeeData.hireDate);

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
