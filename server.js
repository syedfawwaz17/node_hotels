/*
console.log("Server is running");

// function add(a,b){
//     return a+b;
// }

// var add = function add(a,b){
//     return a+b;
// }

// var add = (a,b)=>{return a+b;}
// var result = add(7,1);
// console.log(result);

// (function(){
//     console.log("Hello world");
// })();

function callback(){
    console.log('Addition is completed');
}

function add(a,b,callback){
    console.log(a+b);
    callback();
}

add(9,19,callback);

function ad(a,b,prince){
    console.log(a+b);
    prince();
}

ad(10,20,()=>console.log("Crazy"));

var fs = require('fs');
var os = require('os');
var user=os.userInfo();
console.log(user);

fs.appendFile('greetings.txt','Hi prince  '+ user.username + '!\n',()=>console.log("File is created"));
*/

/*
const notes = require('./notes.js');
var age = notes.age;
var result = notes.addnum(age,18);
console.log(result);


var _ = require('loadash');
var data = ["Person","Person",1,2,1,1,"name","age",'1'];
var filter = _.uniq(data);
console.log(filter);
*/

// const jsonstring='{"name":"fawwaz"}';
// const jsonobj=JSON.parse(jsonstring);
// console.log(jsonobj);

// const jo={
//     name : "fawwaz",
//     age : 20
// }

// const json = JSON.stringify(jo);
// console.log(json);

const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person');
const menu = require('./models/menu');
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuroutes')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000


app.get('/', function (req, res) {
  res.send('Hello sir .. welcome to my hotel')
 })
// app.get('/chicken',function(req,res){
//     res.send("Sure sir .. I would love to serve you chicken")
// })

// app.get('/idli',function(req,res){
//     var c_id={
//         name:"rava idli",
//         size : "10 cm dia",
//         is_sambar : true
//     }
//     res.send(c_id)
// })

// app.post('/person',async (req,res)=>{
// try{
//     const data = req.body;
//     const newPerson = new Person(data);
//     const response = await newPerson.save();
//     console.log("Data saved");
//     res.status(200).json(response);



// }
// catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error'});
// }

// })


// app.get('/person',async (req,res)=>{
//     try{
//         const data = await Person.find();
//         console.log("Data fetched");
//         res.status(200).json(data);

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })



// app.get('/person/:workType',async (req,res)=>{
//     try{

    
//     const workType = req.params.workType
//     if(workType=='Waiter' || workType=='Chef' || workType == 'manager'){
//         const data = await Person.find({work: workType})
//         console.log("Data fetched");
//         res.status(200).json(data);

//     }
//     else{
//         response.status(404).json({error:'Invalid work type'})
//     }
// }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});

    
//     }
// })

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

//Comment added for testing

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})