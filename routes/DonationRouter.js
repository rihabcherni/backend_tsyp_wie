const express=require('express'); 
const router=express.Router(); 
const DonationController =require('../controllers/DonationController');

router.post("/createDonation",DonationController.createDonation);
router.get("/getAllDonations", DonationController.getAllDonations); 
router.get("/getDonationById/:DonationId",DonationController.getDonationById);
router.put("/updateDonationById/:DonationId",DonationController.updateDonationById);
router.delete("/deleteDonationById/:DonationId",DonationController.deleteDonationById);

module.exports = router;
