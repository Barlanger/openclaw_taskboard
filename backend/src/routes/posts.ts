import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController';

const router = Router();

// Public routes
router.get('/posts', getAllPosts);
router.get('/posts/slug/:slug', getPostBySlug);

// Protected routes (in production, add authentication middleware)
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;
