const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes for CRUD operations on admins
router.post('/createAdmin', adminController.createAdmin);
router.get('/getAdmin', adminController.getAllAdmins);
router.get('/getAdmin/:id', adminController.getAdminById);
router.put('/updateAdmin/:id', adminController.updateAdminById);
router.delete('/deleteAdmin/:id', adminController.deleteAdminById);

module.exports = router;
