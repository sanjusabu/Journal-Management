const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const userRoutes = require("./routes/user");
const {createUserTable} = require('./models/User');
const {createFileTable} = require('./models/File');

app.use(express.static(__dirname + "/public"));
app.use(cors());

createUserTable();
createFileTable();

app.use(bodyParser.json());

app.use("/users", userRoutes);

// db();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});