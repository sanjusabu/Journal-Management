const express = require('express');
const router = express.Router();

const { UserController } = require("../controllers")


router.post("/signup",UserController.signup);
router.post("/login",UserController.login);

// router.get("/getusers",UserController.getusers);

module.exports = router;