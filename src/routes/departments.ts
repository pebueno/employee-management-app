import { Router } from 'express';
import { GetAllDepartments } from '../controllers/departments';

const router = Router();

router.get('/', GetAllDepartments);

export default router;
