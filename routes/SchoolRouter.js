const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/SchoolController');

// Create a new school
router.post('/addSchool', schoolController.createSchool);

// Get all schools
router.get('/getSchool', schoolController.getAllSchools);

// Get school by ID
router.get('/getSchool/:id', schoolController.getSchoolById);

// Update school by ID
router.put('/updateSchool/:id', schoolController.updateSchoolById);

// Delete school by ID
router.delete('/deleteSchool/:id', schoolController.deleteSchoolById);

module.exports = router;
