const {City} = require('../models/index.js');

exports.getAllCity=async(req,res)=>{
    try{
        const city= await City.findAll();
        return res.json(city)
    }catch(err){
        return res.json(err)
    }
}
//get city by ID

exports.getCityId=async(req,res)=>{
    try{
        let city= await City.findByPk(req.params.id);
        if(!city){
            return res.status(404).json({"Message":"Unaable to find that City with that ID"})

        }
        return res.json(city)
    }catch(err){
        return res.json(err)

    }
}
exports.createCity= async(req,res)=>{
    const { name, stateId}= req.body
    try{
        let city= await City.create({name, stateId})
        if(!city){
            return res.status(404).json({"Message":"Unable to find a city with that ID"})

        }
        return res.json()
    }catch(err){
        return res.json(err)
    }
} 
