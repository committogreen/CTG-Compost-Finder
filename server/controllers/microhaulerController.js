
const {MicroHauler} = require('../models/index.js');

exports.getAllMicroHaulers= async(req,res)=>{
    try{
        const microhaulers= await MicroHauler.findAll();
        return res.json(microhaulers)
    }catch(err){
        return res.json(err)
    }
}
//get county by id
exports.getMicroHaulerId= async(req,res)=>{
    try{
        let microhauler= await MicroHauler.findByPk(req.params.id);
        if(!microhauler){
            return res.status(404).json({"Message": "Unable to find that microhauler with that ID"})
        }
        return res.json(microhauler)
    }catch(err){
        return res.json(err)
    }
}

//get microHauler by county and state

exports.getMicroHaulersByCounty=async(req,res)=>{
    try{
        const county=req.params.county;
        const state= req.params.state;
        const microHaulers= await MicroHauler.findAll({
            where:{
                county:county,
                state:state
            },
            logging: console.log
        });
        return res.json(microHaulers);
    }catch (err){
        return res.json(err)
    }
}