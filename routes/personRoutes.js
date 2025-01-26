const express = require('express')
const router = express.Router()
const Person = require('./../models/person')
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    
    
    
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
    })

    router.get('/',async (req,res)=>{
        try{
            const data = await Person.find();
            console.log("Data fetched");
            res.status(200).json(data);
    
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
    