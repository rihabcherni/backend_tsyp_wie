const express=require('express'); 
const router=express.Router(); 
const ContactController =require('../controllers/ContactController');

router.post("/addContact",ContactController.addContact);
router.get("/getContact", ContactController.getContact); 
router.get("/getContactById/:id",ContactController.getContactById);
router.delete("/deleteContact/:id",ContactController.deleteContact);

module.exports = router;
