const express = require("express");
const authController = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/ambassador-login", authController.loginAmbassador);
router.post('/admin-login', authController.loginAdmin);
module.exports = router;
