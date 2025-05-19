import express from 'express';
import {
    getUserBlogs,
    getBlogById,
    saveDraft,
    publishBlog,
    getAllPublicBlogs,
    deleteBlog,
    getPublicBlogs,
} from '../api/blog/controllers/blog.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/view/:id', getPublicBlogs);
router.use(authenticate);

router.get('/', getAllPublicBlogs);
router.get('/:id', getBlogById);
//post
router.post('/save-draft', saveDraft);
router.post('/publish', publishBlog);
//delete
router.delete('/:id', deleteBlog);
//extra
router.get('/user/blog', getUserBlogs);

export default router;
