import { Router } from 'express';
import { addUser, getAllUsers } from '../controllers/userControllers';

const router = Router();

router.post('/', addUser);
router.get('/', getAllUsers);

export default router;
