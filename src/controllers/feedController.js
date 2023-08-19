const db = require("../config/database");
const RelationController = require("../controllers/RelationController")

const getallJournals = async (req,res)=>{
    const selectJournal = `select * from \`Journal\` `
    
    try {
        const results = await db.execute(selectJournal);
        res.status(200).json({ Journals: results[0]});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
const teacherFeed = async (req,res)=>{
    const {teacher_id}  = req.body;

    const isTeacher = await RelationController.TeacherExists(teacher_id);
    if(!isTeacher) return res.json({"message": "Teacher does not exist"});

    const selectJournal = `select * from Journal where teacher_id = ?`
    
    try {
        const results = await db.execute(selectJournal,[teacher_id]);

        res.status(200).json({ Journals: results[0]});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const studentFeed = async (req,res)=>{ //can be optimised

    const {student_id} = req.body;
    const isStudent = await RelationController.studentexists(student_id);
    if(!isStudent) return res.json({"message": "Student does not exist"});

    try{

        const getfeed = `select * from \`journalstudentrelation\` where student_id = ?` ;
        const results = await db.execute(getfeed,[student_id]);
        const result = results[0];
        if(result.length !=0){
           let ans =[]
            // console.log(result);
           for(const journal of result){
                // console.log();
                const getJournal = `select * from \`journal\` where journal_id = ? and (published_at IS NULL or published_at < curdate())` ;
                const journ  = await db.execute(getJournal,[journal.journal_id]);
                console.log(journ[0][0]);
                ans.push(journ[0][0]);
            }

            // console.log(ans);
            return res.status(200).json({StudentFeed : ans});
            // console.log(ans);

        }
        return res.json({"message": "Student asigned has no journals"});
    }
    catch(err){
        return res.json({"Error": err});
    }

}

exports.getJournals = getallJournals;
exports.teacherJournals = teacherFeed;
exports.studentFeed = studentFeed;
