const express = require('express')
const router = express.Router()
const Person = require('./../models/person')
const {jwtAutMiddleware,generateToken} = require('./../jwt');

router.post('/signup',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
        console.log("Token is : ", token);
        res.status(200).json(response);
    
    
    
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
    })

    router.post('/login',async(req,res)=>{
        try{

        
        const {username,password} = req.body;
        const user = await Person.findOne({username: username});
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});

        }

        const payload ={
            id : user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json({token})
        }catch(err){
            console.error(err);
            res.status(500).json({error: 'Internal Server Error'});
    
        }
    })

    router.get('/',jwtAutMiddleware,async (req,res)=>{
        try{
            const data = await Person.find();
            console.log("Data fetched");
            res.status(200).json(data);
    
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
    })

    router.get('/profile',jwtAutMiddleware,async(req,res)=>{
        try{
            const userData = req.user;
            console.log("User Data ", userData)

            const userId = userData.id;
            const user = await Person.findById(userId);

            res.status(200).json({user})

        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
    })

    router.get('//:workType',async (req,res)=>{
        try{
    
        
        const workType = req.params.workType
        if(workType=='Waiter' || workType=='Chef' || workType == 'manager'){
            const data = await Person.find({work: workType})
            console.log("Data fetched");
            res.status(200).json(data);
    
        }
        else{
            response.status(404).json({error:'Invalid work type'})
        }
    }
        catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
    
        
        }
    })

    router.put('/:id', async (req,res)=>{
        try{
            const personId = req.params.id;
            const updatePersonData = req.body;
            const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
                new: true,
                runValidators: true
            })
            console.log("Data updated");
            res.status(200).json(response);
            if(!response){
                return response.status(404).json({error:'Person not found!'})
            }
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});

        }
    })
router.delete('/:id',async (req,res)=>{
    try{
    const personId=req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
        return response.status(404).json({error:'Person not found!'})
    }
    console.log("Deleted");
    }
    catch(err){
        console.log(err);
            res.status(500).json({error: 'Internal Server Error'});

    }


})
    module.exports= router
    