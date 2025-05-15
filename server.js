

require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const mongodb = require('./data/database');
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;

app.use(`/`, require(`./routes`));

mongodb.initDb((err)=>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
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

