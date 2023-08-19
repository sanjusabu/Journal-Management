const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const {createUserTable} = require('./models/User');
const {createJournalTable} = require('./models/Journal');
const {createRelation } = require('./models/JournalStudentRelation');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));


const routes = require("./routes")
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use(bodyParser.json());
app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

createUserTable();
createJournalTable();
createRelation();


// db();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});