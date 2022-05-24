import { Router } from 'express';
import { getPosts, savePost } from '../controllers/posts.js';

const router = Router();

router.get('/', getPosts);

router.post('/', savePost);

export default router;