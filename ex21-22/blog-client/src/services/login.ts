import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';

async function login(username: string, password: string) {
    console.log(process.env);
    return axios.post(`${baseUrl}/login`, { username, password });
}

export default login;
