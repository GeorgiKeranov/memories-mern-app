import { Router } from 'express';
import postsRouter from './posts.js';

const router = Router();

router.use('/posts', postsRouter);

export default router;
