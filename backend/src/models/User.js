const db = require("../config/database");

const createUserTable = async () => {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type ENUM('Student', 'Teacher') NOT NULL,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        const [results, fields] = await db.execute(createUserTableQuery);
        console.log("User Table Created");
    } catch (error) {
        console.error("User Table Creation Error", error);
    }
};

module.exports = { createUserTable };
