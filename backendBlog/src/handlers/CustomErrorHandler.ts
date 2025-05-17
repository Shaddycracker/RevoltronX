import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {
    errorCode?: number;

    constructor(message: string, errorCode?: number) {
        super(message);
        this.name = 'ValidationError';
        this.errorCode = errorCode;
    }
}

const customErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ValidationError') {
        // Handle ValidationError
        return res.status(err.errorCode || 400).json({ error: err.message }); // Respond with a 400 Bad Request and the error message
    } else {
        next(err); // Pass other errors to the default error handler
    }
};

export default customErrorHandler;
