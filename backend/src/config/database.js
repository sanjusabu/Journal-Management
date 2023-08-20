const sql = require("mysql2");
require("dotenv").config()
const path = require("path");
const fs = require("fs");
const pool = sql.createPool({
    host: process.env.host,
    user: process.env.dbuser,
    port: process.env.dbport,
    password: process.env.dbpassword,
    database: process.env.database,
});

module.exports = pool.promise();