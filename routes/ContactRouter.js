const express=require('express'); 
const router=express.Router(); 
const ContactController =require('../controllers/ContactController');

router.post("/addContact",ContactController.addContact);
router.get("/getAllContact", ContactController.getAllContact); 
router.get("/getContactDetails/:ContactId",ContactController.getContactDetails);
router.put("/updateContact/:ContactId",ContactController.updateContact);
router.delete("/deleteContact/:ContactId",ContactController.deleteContact);

module.exports = router;