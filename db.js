const mongoose = require('mongoose');
// Mongo Db URL

const mongoUrl = 'mongodb://localhost:27017/hotels';

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