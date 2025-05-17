const swaggerAutogen = require('swagger-autogen')();
const swaggerDocument = require('./swagger.json');

const doc = {
  swagger: "2.0",
  info: {
    title: 'Contacts Api',
    description: 'Contacts Api'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/contacts.js'];

// this will generate swagger.json
(async () => {
  await swaggerAutogen(outputFile, endpointsFiles, doc);
})();

module.exports = swaggerDocument;
