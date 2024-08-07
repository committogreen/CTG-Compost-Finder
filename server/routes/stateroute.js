
const express= require('express')

const router=express.Router()
const stateController= require('../controllers/stateController.js')

router.get('/',stateController.getAllStates);

router.get('/:id',stateController.getStateId);
module.exports = router;