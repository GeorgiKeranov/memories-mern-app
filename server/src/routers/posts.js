import { Router } from 'express';
import { getPosts, getPostById, getRecommendedPosts, savePost, saveCommentOnPost, updatePost, removePost, likePost } from '../controllers/posts.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// GET
router.get('/', getPosts);
router.get('/recommended', getRecommendedPosts);
router.get('/:id', getPostById);

// POST
router.post('/', authMiddleware, savePost);
router.post('/:id/comment', authMiddleware, saveCommentOnPost);

// PATCH
router.patch('/:id', authMiddleware, updatePost);
router.patch('/:id/like', authMiddleware, likePost);

// DELETE
router.delete('/:id', authMiddleware, removePost);

export default router;