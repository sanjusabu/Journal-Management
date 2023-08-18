const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.js");
const journalController = require('../controllers/journalController.js');

router.post("/createjournal",upload,journalController.createJournal);
// router.post("/updateJournal",journalController.updateJournal);
router.delete("/deletejournal",journalController.deleteJournal);
router.get("/getjournals", journalController.getJournals);

module.exports = router;