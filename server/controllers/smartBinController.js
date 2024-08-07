
const {SmartBin} = require('../models/index.js');

exports.getAllSmartBins= async(req,res)=>{
    try{
        const smartBins= await SmartBin.findAll();
        return res.json(smartBins)
    }catch(err){
        return res.json(err)
    }
}
//get county by id
exports.getSmartBinId= async(req,res)=>{
    try{
        let smartBin= await SmartBin.findByPk(req.params.id);
        if(!smartBin){
            return res.status(404).json({"Message": "Unable to find that smartBin with that ID"})
        }
        return res.json(smartBin)
    }catch(err){
        return res.json(err)
    }
}

//get smartbins by County

exports.getSmartBinsByCounty= async(req,res)=>{
    try{
        const county = req.params.county;
        const state = req.params.state;
        const smartBins=await SmartBin.findAll({
            where:{
                county:county,
                state:state
            },
            logging: console.log
        });
        return res.json(smartBins)
    }catch(err){
        return res.json(err)
    }
}

