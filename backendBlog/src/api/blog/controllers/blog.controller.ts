import type { Response } from 'express';
import Blog from '../../../models/blog.model';
import type { AuthRequest } from '../../../handlers/type';

export const getUserBlogs = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        const blogs = await Blog.find({ userId }).sort({ updatedAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllPublicBlogs = async (req: AuthRequest, res: Response) => {
    try {
        const blogs = await Blog.find({ status: 'published' }).sort({ updatedAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBlogById = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const blog = await Blog.findOne({ _id: id, userId });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const saveDraft = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const blogData = req.body;

        let blog;

        if (blogData._id) {
            // Update existing blog
            blog = await Blog.findOneAndUpdate(
                { _id: blogData._id, userId },
                {
                    ...blogData,
                    status: 'draft',
                    updatedAt: new Date(),
                },
                { new: true }
            );

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
        } else {
            // Create new blog
            blog = await Blog.create({
                ...blogData,
                userId,
                status: 'draft',
            });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Save draft error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const publishBlog = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const blogData = req.body;

        if (!blogData.title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!blogData.content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        let blog;

        if (blogData._id) {
            // Update existing blog
            blog = await Blog.findOneAndUpdate(
                { _id: blogData._id, userId },
                {
                    ...blogData,
                    status: 'published',
                    updatedAt: new Date(),
                },
                { new: true }
            );

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
        } else {
            // Create new blog
            blog = await Blog.create({
                ...blogData,
                userId,
                status: 'published',
            });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Publish blog error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const blog = await Blog.findOneAndDelete({ _id: id, userId });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
