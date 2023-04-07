import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const blogStyle: React.CSSProperties = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 3,
};

const detailStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};

const hidden: React.CSSProperties = {
    display: 'none',
};

interface BlogProps {
    fetchAndSetBlogs: () => Promise<void>;
    blog: Blog;
    like: () => Promise<void>;
}

const BlogComponent = ({ fetchAndSetBlogs, blog, like }: BlogProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [username, setUsername] = useState('');

    const getBlogUser = async () => {
        const userJSON = window.localStorage.getItem('loggedInBlogsUser');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user?.username) {
                setUsername(user.username);
            }
        }
    };

    const deleteThisBlog = async () => {
        if (
            window.confirm(
                `Do you really want to delete the blog ${blog.title}?`
            )
        ) {
            await blogService.deleteBlog(blog.id);
            await fetchAndSetBlogs();
        }
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    useEffect(() => {
        getBlogUser();
    }, []);

    return (
        <div className='blog' style={blogStyle}>
            <span className="title">{blog.title}</span>{' '}
            <span className="author">{blog.author}</span>
            <button onClick={toggleDetails}>
                {showDetails ? 'hide' : 'view'}
            </button>
            <div>
                <div style={detailStyles}>
                    <span
                        className="url"
                        style={showDetails ? undefined : hidden}
                    >
                        {blog.url}
                    </span>
                    <span
                        className="likes"
                        style={showDetails ? undefined : hidden}
                    >
                        likes {blog.likes} <button onClick={like}>like</button>
                    </span>
                    <span
                        className="user"
                        style={showDetails ? undefined : hidden}
                    >
                        {blog?.user?.name ? blog.user.name : blog?.user?.username}
                    </span>
                </div>
                {username === blog?.user?.username && (
                    <button onClick={deleteThisBlog}>Remove</button>
                )}
            </div>
        </div>
    );
};

export default BlogComponent;
