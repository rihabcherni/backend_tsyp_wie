const express = require('express');
const router = express.Router();
const ambassadorController = require('../controllers/AmbassadorController');

// Create a new Ambassador
router.post('/addAmbassador', ambassadorController.createAmbassador);

// Get all Ambassadors
router.get('/getAmbassador', ambassadorController.getAllAmbassadors);

// Get Ambassador by ID
router.get('/getAmbassador/:id', ambassadorController.getAmbassadorById);

// Update Ambassador by ID
router.put('/updateAmbassador/:id', ambassadorController.updateAmbassadorById);

// Delete Ambassador by ID
router.delete('/deleteAmbassador/:id', ambassadorController.deleteAmbassadorById);

module.exports = router;
