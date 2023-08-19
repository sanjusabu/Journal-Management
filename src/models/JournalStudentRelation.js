const db = require("../config/database");

const createRelation = async () => {
    const createRelationTable = `
        CREATE TABLE IF NOT EXISTS \`JournalStudentRelation\` (
            \`journal_id\` varchar(255) ,
            \`student_id\` INT NOT NULL,
            primary key (\`journal_id\`, \`student_id\`)
        )
    `;

    try {
        await db.execute(createRelationTable);
        console.log("Relation Table Created");
    } catch (error) {
        console.error("Relation Table Creation Error", error);
    }
};

module.exports = { createRelation };
