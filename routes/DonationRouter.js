const express=require('express'); 
const router=express.Router(); 
const DonationController =require('../controllers/DonationController');

router.post("/createDonation",DonationController.createDonation);
router.get("/getAllDonations", DonationController.getAllDonations); 
router.get("/getDonationById/:DonationId",DonationController.getDonationById);
router.get("/getAllDonationsByDonor/:Donor",DonationController.getAllDonationsByDonor);
router.put("/updateDonationById/:DonationId",DonationController.updateDonationById);
router.delete("/deleteDonationById/:DonationId",DonationController.deleteDonationById);

router.get("/getAllDonationsBySchool/:school",DonationController.getAllDonationsBySchool);

module.exports = router;

