const sql = require("mysql2");

const pool = sql.createPool({
    host: "localhost",
    user: "root",
    password: "sanju",
    database: "Toddle",
});

module.exports = pool.promise();