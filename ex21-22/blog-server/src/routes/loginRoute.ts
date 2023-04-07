import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import User from '../models/user';
import { SECRET } from '../utils/config';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password',
        });
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET as string);

    response
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user.id });
});

export default loginRouter;
