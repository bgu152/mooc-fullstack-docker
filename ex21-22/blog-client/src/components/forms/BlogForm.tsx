import React, { useState } from 'react';

interface BlogFormProps {
    fetchAndSetBlogs: () => Promise<void>;
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
    toggleBlogForm: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postBlog: (blog: NewBlog) => Promise<any>;
}

const BlogForm = ({
    fetchAndSetBlogs,
    setMessage,
    toggleBlogForm,
    postBlog,
}: BlogFormProps) => {
    const [input, setInput] = useState<NewBlog>({
        title: '',
        author: '',
        url: '',
    });
    async function onSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        try {
            console.log('submit: ', input);
            const response = await postBlog(input);

            setMessage({
                type: 'normal',
                body: `A new blog ${input.title} by ${input.author} added`,
            });
            setTimeout(() => {
                setMessage(null);
            }, 4000);
            console.log(response);
            setInput({
                title: '',
                author: '',
                url: '',
            });
            toggleBlogForm();
            await fetchAndSetBlogs();
        } catch (error) {
            console.error(error);
        }
    }
    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.id]: e.target.value });
    }
    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        id="title"
                        value={input.title}
                        onChange={onValueChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input
                        id="author"
                        value={input.author}
                        onChange={onValueChange}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url: </label>
                    <input
                        id="url"
                        value={input.url}
                        onChange={onValueChange}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </>
    );
};

export default BlogForm;
