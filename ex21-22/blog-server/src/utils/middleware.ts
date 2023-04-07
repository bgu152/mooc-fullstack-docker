import * as logger from './logger';
import { Response, Request, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { SECRET } from './config';

const requestLogger = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.error('error: ', error);
    logger.error('error.message: ', error.message);
    logger.error('error.name: ', error.name);
    logger.error('error.code: ', error.code);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
        return response.status(409).json({ error: error.message });
    } else if (error.message === 'data and salt arguments required') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'PasswordError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' });
    }

    next(error);
};

const getTokenFrom = (request: Request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
};

const tokenExtractor = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const token = getTokenFrom(request);
        if (token) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken: any = jwt.verify(token, SECRET as string);
            if (!decodedToken?.id) {
                return response.status(401).json({ error: 'token invalid' });
            } else {
                request.body.token = token;
                next();
            }
        } else {
            return response.status(401).json({ error: 'token invalid' });
        }
    } catch (error) {
        next(error);
    }
};

const userExtractor = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const token = getTokenFrom(request);
        if (token) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken: any = jwt.verify(token, SECRET as string);
            if (!decodedToken?.id) {
                return response.status(401).json({ error: 'token invalid' });
            } else {
                request.body.user = decodedToken.id;
                next();
            }
        } else {
            return response.status(401).json({ error: 'token invalid' });
        }
    } catch (error) {
        next(error);
    }
};

export { requestLogger, unknownEndpoint, errorHandler, userExtractor, tokenExtractor };
