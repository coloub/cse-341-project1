const dotenv =require('dotenv')
dotenv.config();
console.log('Loaded MONGODB_URL:', process.env.MONGODB_URL);

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database){
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    if (!process.env.MONGODB_URL) {
        const errMsg = 'Error: MONGODB_URL environment variable is not set. Please set it in your .env file or environment.';
        console.error(errMsg);
        return callback(new Error(errMsg));
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client)=>{
        database = client;
        callback(null, database);
    })
    .catch((err)=>{
        callback(err);
    });

};

const getDatabase = () => {
    if(!database){
        throw Error ('Database is not initialized')
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};