import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRouter from './routes/blogRoutes';
import userRouter from './routes/userRoutes';
import loginRouter from './routes/loginRoute';
import connectDB from './utils/mongoConnection';
import * as middleware from './utils/middleware';
import * as logger from './utils/logger';
import { userExtractor } from './utils/middleware';
import testingRouter from './routes/testingRouter';
dotenv.config();

const app = express();


app.use(express.static('./react-build'));
app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/users', userRouter);

if (process.env.NODE_ENV === 'test') {
    // app.use('/api/testing', (req: Request, res: Response) => {
    //     res.json({ message: 'ok' });
    // });

    app.use('/testing', testingRouter);
}

app.use('/api/health', (_req, res) => {
    res.send('ok');
});

app.use(userExtractor);
app.use('/blogs', blogRouter);
app.use(middleware.requestLogger);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);


connectDB()
    .then(() => logger.info('connected to MongoDB'))
    .catch((error:Error) =>
        logger.error('error connecting to MongoDB', error.message)
    );

export default app;
 