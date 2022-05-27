import { Router } from 'express';
import { getPosts, savePost, updatePost } from '../controllers/posts.js';

const router = Router();

router.get('/', getPosts);

router.post('/', savePost);

router.patch('/:id', updatePost);

export default router;