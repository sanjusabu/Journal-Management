const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const journalRoutes = require("./routes/journal");
const {createUserTable} = require('./models/User');
const {createFileTable} = require('./models/File');
const {createJournalTable} = require('./models/Journal');

app.use(express.static(__dirname + "/public"));
app.use(cors());

createUserTable();
createFileTable();
createJournalTable();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/journals", journalRoutes);

// db();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});