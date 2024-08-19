import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction): void {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof Error) {
        // Extract the status code if it exists on the erroror object
        statusCode = (error as { status?: number }).status || 500;
        message = error.message;
    }

    res.status(statusCode).json({
        code: statusCode,
        message: message,
    });
}
