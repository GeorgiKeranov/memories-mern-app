import { Router } from 'express';
import { getPosts, getPostById, getRecommendedPosts, savePost, updatePost, removePost, likePost } from '../controllers/posts.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// GET
router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/recommended', getRecommendedPosts);

// POST
router.post('/', authMiddleware, savePost);

// PATCH
router.patch('/:id', authMiddleware, updatePost);
router.patch('/:id/like', authMiddleware, likePost);

// DELETE
router.delete('/:id', authMiddleware, removePost);

export default router;