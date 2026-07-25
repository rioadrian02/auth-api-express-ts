import { Request, Response, NextFunction } from 'express';
import logger from '../../logger/index.js';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        body: req.method !== 'GET' ? req.body : undefined,
    });

    const startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const level = res.statusCode >= 400 ? 'warn' : 'info';
        logger[level](`Response: ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });

    next();
};

export default requestLogger;