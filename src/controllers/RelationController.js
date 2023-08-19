const db = require("../config/database")
const populateRelation = async (id, students) => {
    console.log(id,students);
    let flag =0;
    students.map(async (student)=>{
        const insertquery = `Insert into \`JournalStudentRelation\` (journal_id,student_id) values(?, ?)`;
        //check if students exist
        const check = await studentexists(student);
        console.log(check);
        // check for duplicates too
        if(check){
            try{
            await db.execute(insertquery,[id,student]);
            }
            catch(err){
                console.log(err);
                flag =1;
                return
            }
        }

    })
    if(flag==1) return false;

    return true;
}
const studentexists = async (id)=>{
    try{
   const results = await db.execute("select * from user where type = ? and id = ?",["Student",id]);
   console.log(results[0].length, id);
   if(results[0].length == 0 ) return false;
   return true;
    }
    catch(err){
        console.log(err);
        return false;
    }

}
exports.populateRelation = populateRelation;