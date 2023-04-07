import Blog from '../models/blog';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

const getAllBlogs = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const blogs = await Blog.find().populate({ path: 'user', select:'username name' });
        return response.json(blogs);
    } catch (error) {
        next(error);
    }
};

const getBlog = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const id = request.params.id;
        const blog = await Blog.findById(id);
        return response.json(blog);
    } catch (error) {
        next(error);
    }
};

const addBlog = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const body = request.body;

        const blog = new Blog(body);

        const userId = body.user;

        blog.user = userId;

        const user = await User.findById(userId);

        const savedBlog = await blog.save();

        if (user !== null) {
            user.blogs = user.blogs.concat(savedBlog.id);
            await user.save();
        }

        return response.status(201).json(savedBlog);
    } catch (error) {
        next(error);
    }
};

const updateBlog = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const body = request.body;
        // console.log('request.body: ', body);
        const id = request.params.id;
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
        });
        // console.log('updatedBlog: ', updatedBlog);
        return response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
};

const deleteBlog = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const userId = request.body.user;

        const id = request.params.id;

        const blog = await Blog.findById(id);

        if (!blog) {
            return response.status(204).end();
        } else if (String(blog.user) !== userId) {
            console.log(String(blog.user));

            return response.status(401).json({
                error: 'You and only delete your own blogs',
            });
        } else {
            await Blog.findByIdAndRemove(id);
            return response.status(204).end();
        }
    } catch (error) {
        next(error);
    }
};

export { getAllBlogs, getBlog, addBlog, updateBlog, deleteBlog };
