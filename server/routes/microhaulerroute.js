const express= require('express')

const router=express.Router()
const microHaulerController= require('../controllers/microhaulerController.js')

router.get('/',microHaulerController.getAllMicroHaulers);

router.get('/:id',microHaulerController.getMicroHaulerId);

router.get('/:county/:state',microHaulerController.getMicroHaulersByCounty)
module.exports = router;