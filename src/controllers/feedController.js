const db = require("../config/database");
const RelationController = require("./relationController")
const getallJournals = async (req, res) => {

    try {
        const results = await db.execute(`select * from Journal`);
        res.status(200).json({ Journals: results[0] });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const teacherFeed = async (req, res) => {
    const { teacher_id } = req.body;

    const isTeacher = await RelationController.TeacherExists(teacher_id);
    if (!isTeacher) return res.json({ message: "Teacher does not exist" });

    try {
        const results = await db.execute(`select * from Journal where teacher_id = ?`, [teacher_id]);
        res.status(200).json({ Journals: results[0] });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const studentFeed = async (req, res) => {
    const { student_id } = req.body;
    const isStudent = await RelationController.studentexists(student_id);
    if (!isStudent) return res.json({ message: "Student does not exist" });

    try {
        const feed = await db.execute(
            `SELECT j.journal_id,j.name,j.description,j.created_at,j.file,j.published_at FROM 
            journal j INNER JOIN journalstudentrelation jsr ON j.journal_id = jsr.journal_id
            WHERE jsr.student_id = ? and j.published_at is not null`,
            [student_id]
          );
          if(feed[0].length == 0) return res.json({ message: "No Journals published for you" });
        
        return res.json({ message: feed[0] });
    } catch (err) {
        return res.json({ Error: err });
    }
};

exports.getJournals = getallJournals;
exports.teacherJournals = teacherFeed;
exports.studentFeed = studentFeed;
