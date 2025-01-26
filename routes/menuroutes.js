const express = require('express')
const router = express.Router()
const menu = require('./../models/menu')

router.get('/',async (req,res)=>{
    try{
        const data = await menu.find();
        console.log("Data fetched");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.post('/',async (req,res)=>{
    const data = req.body
    const newMenu = new menu(data)

    const response = await newMenu.save();
    console.log("Data saved");
    res.status(200).json(response);

})

module.exports= router


