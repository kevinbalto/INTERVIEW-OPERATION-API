// #region imports
import swaggerJSDoc from 'swagger-jsdoc';
// #endregion imports

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview Operation REST API',
      version: '1.0.0',
      description: 'A simple API for arithmetic operations',
    },
  },
  apis: ['./src/routes/*/*.ts'], 
});
