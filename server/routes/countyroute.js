
const express= require('express')

const router=express.Router()
const countyController= require('../controllers/countyController.js')

router.get('/',countyController.getAllCounties);
router.get('/:name/:state',countyController.getCounty);
router.get('/:id',countyController.getCountyId);
module.exports = router;