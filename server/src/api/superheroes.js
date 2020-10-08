const express = require('express');
const router = express.Router();
const monk = require('monk');
const Joi = require('@hapi/joi')
const db = monk(process.env.MONGO_URI)
const superheroes = db.get('supehero')
const schema = Joi.object({
    name : Joi.string().trim().required(),
    universe :  Joi.string().trim().required(), 
}
);

//Read all
router.get('/',async (req,res,next)=>{
    try{
    const items = await superheroes.find({});
    console.log("reached 1")
    res.json(items)
    } catch(error){
        next(console.error());
    }
});


//Read one
router.get('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params
        const item = await superheroes.findOne({
            _id: id,
        })
        if(!item) next();
        return res.json(item)
    }   catch(error){
        next(error)
    }
});


//create
router.post('/',async (req,res,next)=>{
    try{
        const value = await schema.validateAsync(req.body);
        const inserted = await superheroes.insert(value)
        res.json(value)
    }catch(error){
        next(error)
    }
});



//update
router.put('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params
        const value = await schema.validateAsync(req.body)
        const item = await superheroes.findOne({
            _id: id,
        })
        if(!item) next();
        const updated = await superheroes.update({
            _id:id,
        },{
            $set:value
        })
        res.json(updated)
    }catch(error){
        next(error)
    }
});



//Delete
router.delete('/:id',async(req,res,next)=>{
    try{
        const {id} = req.params
        await superheroes.remove({_id:id})
        res.json({
            message: "Success"
        })
    }catch(error){
        next(error)
    }
});

module.exports = router;