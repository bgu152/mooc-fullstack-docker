import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';

let token: string | null = null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const config = {
        headers: { Authorization: token }, 
    };
    const request = axios.get(`${baseUrl}/blogs`, config);

    return request.then((response) => response.data);
};

const postBlog = (blog: NewBlog) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.post(`${baseUrl}/blogs`, blog, config);

    return request.then((response) => response.data);
};

const updateBlog = (blog: BlogUpdate, id: string) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.put(`${`${baseUrl}/blogs`}/${id}`, blog, config);

    return request.then((response) => response.data);
};

const deleteBlog = (id: string) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.delete(`${`${baseUrl}/blogs`}/${id}`, config);
};

export default { getAll, setToken, postBlog, updateBlog, deleteBlog };
