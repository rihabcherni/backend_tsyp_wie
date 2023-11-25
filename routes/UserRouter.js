const express=require('express'); 
const router=express.Router(); 
const UserController =require('../controllers/UserController');

router.post("/addUser",UserController.addUser);
router.get("/getAllUser", UserController.getAllUser); 
router.get("/getUserDetails/:UserId",UserController.getUserDetails);
router.put("/updateUser/:UserId",UserController.updateUser);
router.delete("/deleteUser/:UserId",UserController.deleteUser);

module.exports = router;