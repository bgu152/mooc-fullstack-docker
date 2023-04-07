type Blog = {
    title: string;
    id: string;
    author: string;
    likes: number;
    url: string;
    user: BlogUser;
};

type BlogUser = {
    name?: string;
    username: string;
    id: string;
};

type User = {
    name?: string;
    username: string;
    id: string;
    token: string;
};

type NewBlog = {
    title: string;
    author: string;
    url: string;
};

type BlogUpdate = {
    title?: string;
    author?: string;
    url?: string;
    likes?: number;
};

type Message = {
    type: 'error' | 'normal';
    body: string;
};
