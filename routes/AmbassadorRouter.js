const express = require('express');
const router = express.Router();
const ambassadorController = require('../controllers/AmbassadorController');

router.post('/addAmbassador', ambassadorController.createAmbassador);
router.get('/getAmbassador', ambassadorController.getAllAmbassadors);
router.get('/getAmbassador/:id', ambassadorController.getAmbassadorById);
router.put('/updateAmbassador/:id', ambassadorController.updateAmbassadorById);
router.delete('/deleteAmbassador/:id', ambassadorController.deleteAmbassadorById);

module.exports = router;
