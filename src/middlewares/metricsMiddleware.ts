// #region imports
import { Request, Response, NextFunction } from 'express';
import { httpRequestDurationMicroseconds } from '../config/metrics';
// #endregion imports

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration);
  });

  next();
};
