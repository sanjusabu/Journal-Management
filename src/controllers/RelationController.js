const db = require("../config/database")
const populateRelation = async (id, students) => {
    // console.log(id, students);
    for(const student of students){
        const check = await studentexists(Number(student));
        if(!check) return false;
    }
    for (const student of students) {
        const insertQuery = `Insert into JournalStudentRelation (journal_id, student_id) values (?, ?)`;
            try {
                await db.execute(insertQuery, [id, student]);
            } catch (err) {
                // console.log(err);
                return false;
            }
    }
    return true;
}

const studentexists = async (id)=>{
    try{
        const results = await db.execute("select * from user where type = ? and id = ?",["Student",id]);
        if(results[0].length == 0 ) return false;
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}

const TeacherExists = async (id)=>{
    try{
        const results = await db.execute("select * from user where type = ? and id = ?",["Teacher",id]);
        if(results[0].length == 0 ) return false;
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}

exports.populateRelation = populateRelation;
exports.studentexists = studentexists;
exports.TeacherExists = TeacherExists;