import express from 'express';
import {
    getUserBlogs,
    getBlogById,
    saveDraft,
    publishBlog,
    getAllPublicBlogs,
    deleteBlog,
} from '../api/blog/controllers/blog.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllPublicBlogs);
router.get('/:id', getBlogById);
router.post('/save-draft', saveDraft);
router.post('/publish', publishBlog);
router.delete('/:id', deleteBlog);
//extra
router.get('/user/blog', getUserBlogs);

export default router;
