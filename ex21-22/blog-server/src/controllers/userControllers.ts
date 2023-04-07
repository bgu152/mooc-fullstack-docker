import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

const addUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { username, name, password } = request.body;

        if (!password || password.length < 3) {
            const e = Error('Password error');
            e.name = 'PasswordError';
            throw e;
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            passwordHash,
            name,
        });

        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find().populate('blogs');
        response.json(users);
    } catch (error) {
        next(error);
    }
};

export { addUser, getAllUsers };
