const db = require("../config/database");

const createJournalTable = async () => {
    const createJournalTableQuery = `
        CREATE TABLE IF NOT EXISTS \`Journal\` (
            \`journal_id\` varchar(255) PRIMARY KEY,
            \`name\` VARCHAR(255) unique,
            \`teacher_id\` INT NOT NULL,
            \`description\` TEXT ,
            \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            \`file\` TEXT,
            \`published_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        await db.execute(createJournalTableQuery);
        console.log("Journal Table Created");
    } catch (error) {
        console.error("Journal Table Creation Error", error);
    }
};

module.exports = { createJournalTable };
