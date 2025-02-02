
const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person');
const menu = require('./models/menu');
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuroutes')
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('./auth')
app.use(bodyParser.json());

//Middleware function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);


app.use(passport.initialize());
const localAuth = passport.authenticate('local',{session: false})
app.get('/', function (req, res) {
  res.send('Hello sir .. welcome to my hotel')
 })



app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

//Comment added for testing
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server is listening on port 3000");
})