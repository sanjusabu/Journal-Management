const db = require("../config/database");

const createFileTable = async () => {
const createFileTableQuery = `
    CREATE TABLE IF NOT EXISTS \`File\` (
        \`file_id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`type\` VARCHAR(255) NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`teacher_id\` INT NOT NULL
    )
`;

const result = await db.execute(createFileTableQuery)
// console.log(result);
}

module.exports = {createFileTable};

