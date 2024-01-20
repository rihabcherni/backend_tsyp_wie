const express=require('express'); 
const router=express.Router(); 
const DashboardController =require('../controllers/DashboardController');

router.get("/StatistiquesAdmin",DashboardController.StatistiquesAdmin);
router.get("/SchoolStatisticsByYear",DashboardController.SchoolStatisticsByYear);
router.get("/DonationStatisticsByYear",DashboardController.DonationStatisticsByYear);
router.get("/lastDonationAdmin",DashboardController.lastDonationAdmin);
router.get("/lastDonorAdmin",DashboardController.lastDonorAdmin);

router.get("/StatistiquesDonor/:donorId",DashboardController.StatistiquesDonor);
router.get("/lastDonationDonor/:donorId",DashboardController.lastDonationDonor);
router.get("/lastSchoolDonor",DashboardController.lastSchoolDonor);
router.get("/DonationStatisticsByYearDonor/:donorId",DashboardController.DonationStatisticsByYearDonor);
router.get("/StatistiquesAmbassador/:schoolId",DashboardController.StatistiquesAmbassador);
module.exports = router;
