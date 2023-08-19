const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const Authmiddleware = require("../middleware/check-auth.js");

router.post("/signup",userController.signup);
router.post("/login",userController.login);

// router.use(Authmiddleware);
router.get("/getusers",userController.getusers);

module.exports = router;