const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.js");
const { JournalController } = require('../controllers');
const { Authmiddleware } = require("../middleware");


router.post("/createjournal",upload,Authmiddleware,JournalController.createJournal);
router.patch("/updateJournal",Authmiddleware,JournalController.updateJournal);
router.delete("/deletejournal",Authmiddleware,JournalController.deleteJournal);
router.post("/publishJournal" ,Authmiddleware,JournalController.publishJournal);

module.exports = router;