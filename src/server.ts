// #region Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import operationRoutes from './routes/v1/opetationsRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { metricsMiddleware } from './middlewares/metricsMiddleware';
import { register } from './config/metrics';
import { loggingMiddleware } from './middlewares/loggingMiddleware';
// #endregion Imports

// #region Server Setup
dotenv.config();

connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(rateLimit(
    { 
        windowMs: 15 * 60 * 1000, 
        max: 100 
    }
));
app.use(express.json());
app.use(metricsMiddleware);
app.use(loggingMiddleware);

//Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/operations', operationRoutes);
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});
// #endregion Server Setup

export default app;