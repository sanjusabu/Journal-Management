const db = require("../config/database");

const createJournalTable = async () => {
    const createJournalTableQuery = `
        CREATE TABLE IF NOT EXISTS Journal (
            journal_id varchar(255) PRIMARY KEY,
            name VARCHAR(255) not null,
            teacher_id INT NOT NULL,
            description TEXT ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            file TEXT,
            published_at DATETIME,
            FOREIGN KEY (teacher_id) REFERENCES User(id) ON DELETE CASCADE
        );
        
    `;

    try {
        await db.execute(createJournalTableQuery);
        console.log("Journal Table Created");
    } catch (error) {
        console.error("Journal Table Creation Error", error);
    }
};

module.exports = { createJournalTable };
