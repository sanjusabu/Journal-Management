const express = require("express");

const FeedRoutes= require("./feed")
const JournalRoutes= require("./journal")
const UserRoutes= require("./user")

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/journals", JournalRoutes);
router.use("/feed", FeedRoutes);

module.exports = router