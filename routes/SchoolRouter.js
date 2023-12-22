const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/SchoolController');

router.post('/addSchool', schoolController.createSchool);
router.get('/getSchool', schoolController.getAllSchools);
router.get('/getAllSchoolsDemande', schoolController.getAllSchoolsDemande);
router.get('/getSchool/:id', schoolController.getSchoolById);
router.put('/updateSchool/:id', schoolController.updateSchoolById);
router.delete('/deleteSchool/:id', schoolController.deleteSchoolById);
router.get('/acceptSchool/:id', schoolController.acceptSchool);

module.exports = router;
