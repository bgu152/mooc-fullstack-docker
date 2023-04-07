import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import './index.css';
import LoginForm from './components/forms/LoginForm';
import BlogForm from './components/forms/BlogForm';
import BlogsList from './components/BlogsList';
import Togglable from './components/Togglable';

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [message, setMessage] = useState<Message | null>(null);
    const blogFormRef = useRef<{ toggleVisibility: () => void }>(null);

    const likeBlog = async (id: string) => {
        const blog = blogs.find((b) => b.id === id);
        if (blog) {
            await blogService.updateBlog(
                { likes: blog?.likes + 1 },
                id
            );
            setBlogs(
                blogs.map((b) =>
                    b.id !== id ? b : { ...b, likes: blog.likes + 1 }
                )
            );
        }
    };

    const fetchAndSetBlogs = async () => {
        const blogs = await blogService.getAll();
        console.log(blogs);
        setBlogs(blogs);
    };

    function logout() {
        window.localStorage.removeItem('loggedInBlogsUser');
        setUser(null);
    }

    function toggleBlogForm() {
        console.log('toggleBlogForm');
        if (blogFormRef?.current?.toggleVisibility) {
            blogFormRef?.current.toggleVisibility();
        } else {
            return;
        }
    }

    useEffect(() => {
        const userJSON = window.localStorage.getItem('loggedInBlogsUser');
        if (userJSON) {
            const userParsed: User = JSON.parse(userJSON);
            setUser(userParsed);
            blogService.setToken(userParsed.token);
        }
    }, []);

    const blogsSorted = blogs.sort((b1, b2) => (b1.likes > b2.likes ? -1 : 1));

    return (
        <div>
            {user && (
                <>
                    <h2>Blogs</h2>
                    <Notification message={message} />
                    <p>
                        {user?.name
                            ? `${user.name} logged in`
                            : `${user.username} logged in`}
                        <button onClick={logout}>Logout</button>
                    </p>
                    <Togglable buttonLabel="create" ref={blogFormRef}>
                        <BlogForm
                            fetchAndSetBlogs={fetchAndSetBlogs}
                            setMessage={setMessage}
                            toggleBlogForm={toggleBlogForm}
                            postBlog={blogService.postBlog}
                        />
                    </Togglable>
                    <BlogsList
                        fetchAndSetBlogs={fetchAndSetBlogs}
                        blogs={blogsSorted}
                        likeBlog={likeBlog}
                    />
                </>
            )}
            {!user && (
                <>
                    <h2>Login</h2>
                    <Notification message={message} />
                    <LoginForm
                        setUser={setUser}
                        setToken={blogService.setToken}
                        setMessage={setMessage}
                    />
                </>
            )}
        </div>
    );
};

export default App;
