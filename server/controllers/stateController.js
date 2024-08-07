const {State} = require('../models/index.js');
const {Op}= require('sequelize');

exports.getAllStates=async(req,res)=>{  
   // console.log(new State());
    try{
        
       const states= await State.findAll();
        return res.json(states)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
}
//get state by ID
exports.getStateId= async(req,res)=>{
    try{
        let state=  await State.findByPk(req.params.id);
        if(!state){
            return res.status(404).json({"Message":"Unable to find state with that ID"})
        }
        return res.json(state)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
}

exports.createState= async(req,res)=>{
    const {name,abbreviation}=req.body 
    try{
        let state= await State.create({name,abbreviation})
        if(!state){
            return res.status(404).json({"Message":" Unable to create state"})
        }
        return res.json()
    }catch(err){
        console.log(err)
        return res.json(err)

    }
}
//update state
exports.updateState= async(req,res) =>{
    let stateId= req.params.id
    try{
        let state=await State.findOne({
            where:{ 
                id: stateId
            }
        })
        if(!state){
            return res.status(404).json({"Message":"Unable to find state with that ID"})
        }
        //list of attributes that should not be modified
        const excludeAttributes=['id']
        const filteredAttributes= Object.keys(req.body).reduce((acc,key)=>{
            if (!excludeAttributes.includes(key)){
                acc[key]= req.body[key];
            }
            return acc;
        }, {});
        //if there are no valid attributes to update then throw error 
        if(Object.keys(filteredAttributes).length===0){
            return res.json({"Message": "Unable to update any attributes"})
        }

        state=await state.update(filteredAttributes)
        return res.status(200).json()
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}
