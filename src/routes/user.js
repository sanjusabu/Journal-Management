const express = require('express');
const router = express.Router();

const { UserController } = require("../controllers")

const { Authmiddleware } = require("../middleware");

router.post("/signup",UserController.signup);
router.post("/login",UserController.login);

// router.use(Authmiddleware);
// router.get("/getusers",UserController.getusers);

module.exports = router;