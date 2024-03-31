import { Router } from 'express';
import { GetAllEmployees, 
         CreateEmployee,
         GetEmployeeById,
         UpdateEmployee,
         DeleteEmployee
 } from '../controllers/employees';

const router = Router();

router.post('/', CreateEmployee);
router.get('/', GetAllEmployees);
router.get('/:id', GetEmployeeById);
router.put('/:id', UpdateEmployee);
router.delete('/:id', DeleteEmployee);

export default router;