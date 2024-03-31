import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Department from '../entity/Department';

interface DepartmentType {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const GetAllDepartments = async (req: Request, res: Response) => {
    try {
      const departmentRepository = AppDataSource.getRepository(Department);
      const departments = await departmentRepository.find();
    console.log('Loaded departments:', departments);
      res.status(200).json({ departments });
    } catch (error) {
      console.error('Error retrieving departments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };