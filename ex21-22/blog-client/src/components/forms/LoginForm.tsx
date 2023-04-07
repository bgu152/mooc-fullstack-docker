import React, { useState } from 'react';
import login from '../../services/login';

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setToken: (newToken: string) => void;
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
}

const LoginForm = ({ setUser, setToken, setMessage }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log('logging in with', username, password);

        try {
            const response = await login(username, password);

            if (response?.status === 200) {
                const user: User = {
                    username: response?.data.username,
                    id: response?.data.id,
                    token: response?.data.token,
                };

                setToken(response?.data.token);

                if (response?.data?.name) {
                    user.name = response?.data.name;
                }
                window.localStorage.setItem(
                    'loggedInBlogsUser',
                    JSON.stringify(user)
                );
                setUser(user);
            } else if (response?.status === 401) {
                console.log(401);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            setMessage({
                type: 'error',
                body: error.response.data.error,
            });
            setTimeout(() => {
                setMessage(null);
            }, 4000);
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="login-button">login</button>
            </form>
        </>
    );
};

export default LoginForm;
