import { Router } from 'express';
import Blog from '../models/blog';
import User from '../models/user';
import { Request, Response } from 'express';

const testingRouter = Router();

testingRouter.post('/reset', async (request: Request, response: Response) => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    response.status(204).end();
});

export default testingRouter;
