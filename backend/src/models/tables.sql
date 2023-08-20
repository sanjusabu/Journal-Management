 `CREATE TABLE IF NOT EXISTS User (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type ENUM('Student', 'Teacher') NOT NULL,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
 `CREATE TABLE IF NOT EXISTS Journal (
            journal_id varchar(255) PRIMARY KEY,
            name VARCHAR(255) not null,
            teacher_id INT NOT NULL,
            description TEXT ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            file TEXT,
            published_at DATETIME,
            FOREIGN KEY (teacher_id) REFERENCES user(id) ON DELETE CASCADE
        );`
          
`CREATE TABLE IF NOT EXISTS JournalStudentRelation (
        journal_id varchar(255),
        student_id INT NOT NULL,
        primary key (journal_id, student_id),
        foreign key (journal_id) references Journal(journal_id) on delete cascade,
        foreign key (student_id) references User(id) on delete cascade
    );`

