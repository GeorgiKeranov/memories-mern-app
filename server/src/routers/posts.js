import { Router } from 'express';
import { getPosts, savePost, updatePost, removePost, likePost } from '../controllers/posts.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get('/', getPosts);
router.post('/', authMiddleware, savePost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, removePost);
router.patch('/:id/like', authMiddleware, likePost);

export default router;