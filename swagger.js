const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API documentation for Contacts management',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'https://cse-341-project1-d47t.onrender.com',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            favoriteColor: {
              type: 'string',
              example: 'blue',
            },
            birthday: {
              type: 'string',
              format: 'date',
              example: '1990-01-01',
            },
          },
        },
        ContactId: {
          type: 'string',
          description: 'Contact ID',
          example: '60d0fe4f5311236168a109ca',
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
