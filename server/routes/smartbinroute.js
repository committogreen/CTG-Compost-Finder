
const express= require('express')

const router=express.Router()
const smartBinController= require('../controllers/smartBinController.js')

router.get('/',smartBinController.getAllSmartBins);

router.get('/:id',smartBinController.getSmartBinId);
router.get('/:county/:state',smartBinController.getSmartBinsByCounty);
module.exports = router;