const express = require('express');
const router = express.Router();

const { FeedController } = require("../controllers")

const { Authmiddleware } = require("../middleware")

router.use(Authmiddleware);

router.get("/getjournals", FeedController.getJournals);
router.post("/teacherfeed",FeedController.teacherJournals);
router.post("/studentfeed", FeedController.studentFeed);

module.exports = router;