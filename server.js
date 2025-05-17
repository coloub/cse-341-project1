require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const mongodb = require('./data/database');
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  next();
});

app.use(`/`, require(`./routes`));

mongodb.initDb((err)=>{
    if(err){
        console.error('Failed to connect to database:', err);
        process.exit(1); // Exit process if DB connection fails
    }
    else{
        app.listen(port, () => {
            console.log(`Database is connected and server running on port ${port}`);
        });
    }
});

//Test
app.get('/db-test', async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const collections = await db.listCollections().toArray();
    res.json({ collections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
