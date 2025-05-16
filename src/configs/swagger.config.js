const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce application',
    },
    servers: [
      {
        url: 'https://ecommerce-backend-b54w.onrender.com/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Đường dẫn tới các file định nghĩa API
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;