import React, { useEffect } from 'react';
import Blog from './BlogComponent';

interface BlogsListProps {
    fetchAndSetBlogs: () => Promise<void>;
    blogs: Blog[];
    likeBlog: (id: string) => Promise<void>;
}

const BlogsList = ({ fetchAndSetBlogs, blogs, likeBlog }: BlogsListProps) => {
    useEffect(() => {
        fetchAndSetBlogs();
    }, []);

    return (
        <>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    fetchAndSetBlogs={fetchAndSetBlogs}
                    like={() => likeBlog(blog.id)}
                />
            ))}
        </>
    );
};

export default BlogsList;
