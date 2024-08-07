const express= require('express')

const router=express.Router()
const dropOffController= require('../controllers/dropOffController.js')

router.get('/',dropOffController.getAllDropOffs);
router.get('/:county/:state',dropOffController.getDropOffsByCounty);
router.get('/:id',dropOffController.getDropOffId);
// Route to get drop-offs by countyId
module.exports = router;