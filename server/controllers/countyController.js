const {County} = require('../models/index.js');

exports.getAllCounties= async(req,res)=>{
    try{
        const county= await County.findAll();
        return res.json(county)
    }catch(err){
        return res.json(err)
    }
}
//get county by name and state
exports.getCounty= async(req,res)=>{
  try{
      const name= req.params.name;
      const state = req.params.state;
      const county = await County.findOne({
        where: {
          name: name,
          state: state
        },
        logging: console.log // Log the generated SQL query
      });
      return res.json(county);
  }catch(err){
      return res.json(err)
  }
}
//get county by id
exports.getCountyId= async(req,res)=>{
    try{
        let county= await County.findByPk(req.params.id);
        if(!county){
            return res.status(404).json({"Message": "Unable to find that county with that ID"})
        }
        return res.json(county)
    }catch(err){
        return res.json(err)
    }
}
