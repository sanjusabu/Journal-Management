const express = require('express');
const router = express.Router();

const { FeedController } = require("../controllers")

const { Authmiddleware } = require("../middleware")

router.use(Authmiddleware);

router.get("/teacherfeed",Authmiddleware,FeedController.teacherJournals);
router.get("/studentfeed",Authmiddleware,FeedController.studentFeed);

module.exports = router;