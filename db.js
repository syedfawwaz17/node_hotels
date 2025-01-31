const mongoose = require('mongoose');
require('dotenv').config();
// Mongo Db URL

//const mongoUrl = process.env.DB_URL_LOCAL;
const mongoUrl = process.env.DB_URL;


mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDb server');
})

db.on('error',(err)=>{
    console.log("MongoDb connection error : ",err);
})

db.on('disconnected',()=>{
    console.log("MongoDb disconnected ");
})

module.exports = db;