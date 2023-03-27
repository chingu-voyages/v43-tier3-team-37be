const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set("strictQuery", false);

const connectDb = async ()=>{
const host = process.env.MONGO_HOST || 'localhost';
const port = parseInt(process.env.MONGO_PORT, 10) || 27017;
const username = process.env.MONGO_USER || '';
const password = process.env.MONGO_PWD || '';
const db = process.env.MONGO_DB || 'tasteat-app';

const connectionArgs = ['mongodb://'];

if (username && password) {
    connectionArgs.push(`${username}:${password}@`);
}

connectionArgs.push(`${host}:${port}/${db}`);
const databaseUrl = connectionArgs.join('');
    try {
        await mongoose.connect(databaseUrl);
          console.log("DB Connection Successfull!");
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDb;