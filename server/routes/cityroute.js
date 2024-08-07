
const express= require('express')

const router=express.Router()
const cityController= require('../controllers/cityController.js')

router.get('/',cityController.getAllCity);

router.get('/:id',cityController.getCityId);
module.exports = router;