const express = require("express");
const authController = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", authController.login);
router.post('/addImageProfile/:userId', authController.addImageProfile);

module.exports = router;
