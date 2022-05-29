import { Router } from 'express';
import postsRouter from './posts.js';
import usersRouter from './users.js';

const router = Router();

router.use('/posts', postsRouter);
router.use('/users', usersRouter);

export default router;
