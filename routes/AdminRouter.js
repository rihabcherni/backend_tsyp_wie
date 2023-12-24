const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.post('/createAdmin', adminController.createAdmin);
router.get('/getAdmin', adminController.getAllAdmins);
router.get('/getAdmin/:id', adminController.getAdminById);
router.put('/updateAdmin/:id', adminController.updateAdminById);
router.delete('/deleteAdmin/:id', adminController.deleteAdminById);
router.put('/updateAdminPassword/:id', adminController.updateAdminPassword);
module.exports = router;
