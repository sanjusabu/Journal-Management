const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.js");
const journalController = require('../controllers/journalController.js');
const Authmiddleware = require("../middleware/check-auth.js");

router.use(Authmiddleware);

router.post("/createjournal",upload,journalController.createJournal);
// router.post("/updateJournal",journalController.updateJournal);
router.delete("/deletejournal",journalController.deleteJournal);
router.post("/publishJournal" , journalController.publishJournal);

module.exports = router;