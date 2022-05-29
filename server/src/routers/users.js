import { Router } from 'express';
import { registerUser } from '../controllers/users.js';

const router = Router();

router.post('/register', registerUser);

export default router;