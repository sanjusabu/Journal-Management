create Table if not exists `User` (
    `id` integer primary key autoincrement,
    `type` enum('Student', 'Teacher') not null,
    `username` varchar(255) not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `created_at` datetime,
);

create Table if not exists `File` (
    `file_id` integer primary key autoincrement,
    `type` varchar(255) not null,
    `name` varchar(255) not null,
    `teacher_id` integer not null,
);

create Table if not exists `Journal` (
    `journal_id` integer primary key autoincrement,
    `name` varchar(255) not null,
    `teacher_id` integer not null,
    `description` text not null,
    `created_at` datetime ,
    `file_id` integer ,
);

create Table if not exists `JournalStudentRelation` (
    `id` integer primary key autoincrement,
    `journal_id` integer not null,
    `student_id` integer not null,
    `created_at` datetime ,
);