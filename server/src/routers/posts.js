import { Router } from 'express';
import { getPosts, savePost, updatePost, removePost } from '../controllers/posts.js';

const router = Router();

router.get('/', getPosts);
router.post('/', savePost);
router.patch('/:id', updatePost);
router.delete('/:id', removePost);

export default router;