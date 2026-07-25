import { Request, Response, NextFunction } from 'express';
import ClientError from '../../../Commons/exceptions/ClientError.js';
import logger from '../../logger/index.js';

const ErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    if (error instanceof ClientError) {
        logger.warn(error.message, { statusCode: error.statusCode });

        return res.status(error.statusCode).json({
            status: 'fail',
            message: error.message,
        });
    }

    if (/^[A-Z_]+\.[A-Z_]+$/.test(error.message)) {
        logger.warn(error.message);

        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }

    logger.error(error.message, { stack: error.stack });

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};

export default ErrorHandler;