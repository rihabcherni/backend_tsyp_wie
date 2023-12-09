const express=require('express'); 
const router=express.Router(); 
const DashboardController =require('../controllers/DashboardController');

router.get("/StatistiquesAdmin",DashboardController.StatistiquesAdmin);
router.get("/SchoolStatisticsByYear",DashboardController.SchoolStatisticsByYear);
router.get("/DonationStatisticsByYear",DashboardController.DonationStatisticsByYear);
router.get("/lastDonationAdmin",DashboardController.lastDonationAdmin);
router.get("/lastDonorAdmin",DashboardController.lastDonorAdmin);

module.exports = router;

