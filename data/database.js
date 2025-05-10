const dotenv = require('dotenv');
dotenv.config();

console.log('Loaded MONGODB_URL:', process.env.MONGODB_URL);

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('⚠️ Db is already initialized!');
    return callback(null, database);
  }

  if (!process.env.MONGODB_URL) {
    const errMsg = '❌ Error: MONGODB_URL environment variable is not set. Please set it in your .env file or environment.';
    console.error(errMsg);
    return callback(new Error(errMsg));
  }

  // 🔐 Agregamos opciones necesarias para conexión con MongoDB Atlas
  MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
    .then((client) => {
      database = client.db(); // Puedes usar .db('project1') si quieres especificar el nombre
      console.log('✅ Connected to MongoDB Atlas');
      callback(null, database);
    })
    .catch((err) => {
      console.error('❌ Error al conectar a MongoDB:', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('❌ Database is not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
