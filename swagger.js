const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['*'], // Specify the path to your API routes files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
