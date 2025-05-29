// #region imports
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger'; 
// #endregion imports

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  (req as any)._startTime = startTime;

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.info({
      message: 'HTTP Request',
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      responseTime: duration,
    });
  });

  next();
};
