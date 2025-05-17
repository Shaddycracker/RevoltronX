import express from 'express';
import {
    getBlogs,
    getBlogById,
    saveDraft,
    publishBlog,
    deleteBlog,
} from '../api/blog/controllers/blog.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/save-draft', saveDraft);
router.post('/publish', publishBlog);
router.delete('/:id', deleteBlog);

export default router;
