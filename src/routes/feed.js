const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController.js');

const Authmiddleware = require("../middleware/check-auth.js");

router.use(Authmiddleware);

router.get("/getjournals", feedController.getJournals);
router.post("/teacherfeed",feedController.teacherJournals);
router.post("/studentfeed", feedController.studentFeed);

module.exports = router;