const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.js");
const { JournalController } = require('../controllers');
const { Authmiddleware } = require("../middleware");

router.use(Authmiddleware);

router.post("/createjournal",upload,JournalController.createJournal);
router.patch("/updateJournal",JournalController.updateJournal);
router.delete("/deletejournal",JournalController.deleteJournal);
router.post("/publishJournal" , JournalController.publishJournal);

module.exports = router;