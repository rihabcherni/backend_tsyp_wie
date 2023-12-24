const express=require('express'); 
const router=express.Router(); 
const DonorController =require('../controllers/DonorController');

router.post("/addDonor",DonorController.addDonor);
router.get("/getAllDonor", DonorController.getAllDonor); 
router.get("/getDonorDetails/:DonorId",DonorController.getDonorDetails);
router.put("/updateDonor/:id",DonorController.updateDonor);
router.delete("/deleteDonor/:donorId",DonorController.deleteDonor);
router.put('/updateDonorPassword/:id', DonorController.updateDonorPassword);
module.exports = router;





