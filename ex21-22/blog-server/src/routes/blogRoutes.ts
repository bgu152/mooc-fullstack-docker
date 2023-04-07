import { Router } from 'express';
import {
    getAllBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blogControllers';

const router = Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.post('/', addBlog);

export default router;
