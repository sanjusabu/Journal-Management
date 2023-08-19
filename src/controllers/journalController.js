const db = require("../config/database");
const UUID = require("uuid");
require('dotenv').config();
const fileUpload = require("../utils/fileUpload");
const RelationController = require("./relationController");

const createJournal = async (req, res) => {
    // console.log(req.file);
    const {name,teacher_id,description,students} = req.body;
    const file = req.file;
    let studentsArray = [];
    const id = UUID.v4();

    const isTeacher = await RelationController.TeacherExists(teacher_id);
    if(!isTeacher) return res.json({"error": "Teacher does not exist"});
    let result;
    try {
        const insertJournal = `INSERT INTO Journal (journal_id,name,teacher_id,description,file)
        VALUES (?, ?, ?, ?, ?)`;
        if(file == null){
            await db.execute(insertJournal, [id,name,teacher_id,description,null]);
        }
        else{
            result = await fileUpload.Uploadfile(id,file);
            await db.execute(insertJournal, [id,name,teacher_id,description,result.secure_url]);    
        }
    } catch (error) {
           return res.status(500).json({ "message": "Journal Creation Failed", "error": error });
    }
    
    // This is a check to populate the Journal Student Relation table.
    try {
        studentsArray = JSON.parse(students).map(Number);
        let check = await RelationController.populateRelation(id,studentsArray);
        if(!check) return res.json({"error": "Students to be notified do not exist", "message": "Private Journal Created"})

    } catch (error) {
        console.error("Error parsing students array:", error);
    }

    res.json({"message": "Journal Created Successfully"})
}

const updateJournal = async (req,res)=>{
    const {journal_id,name,teacher_id,description} = req.body;
    const file = req.file;
    let journal;
    //
    try{
        const result  =  await db.execute("select * from journal where journal_id = ? and teacher_id =  ?",[journal_id,teacher_id]);
        journal = result[0][0];
        console.log(journal);
        if(journal.length==0 || journal == null) return res.json({"message": "Journal does not exist"});
    }
    catch(err){
        return res.json({"Error": "Journal does not exist"});
    }

    if(name != null){
        try{
            const result  =  await db.execute("select * from journal where name =  ?",[name]);
            if(result[0].length != 0) return res.json({"message": "Journal name already exists,try a different name"});

            if(description != null){
                await db.execute(`update journal set name = ?,description = ? where journal_id = ? and teacher_id = ?`
                ,[name,description,journal_id,teacher_id]);
            }
            else{
                await db.execute(`update journal set name = ? where journal_id = ? and teacher_id = ?`,
                [name,journal_id,teacher_id]);
            }
        }
        catch(err){
            return res.json({"Error": err});
        }
    }

    res.json({"message": "Journal Updated Successfully"});
    //name update error
}

const deleteJournal = async (req,res)=>{
    const {name,teacher_id}  = req.body;
    try {
        await db.execute(`delete from Journal where name = ? and teacher_id= ?`, [name,teacher_id]);
        // console.log(result[1]);
        res.status(200).json({ message: `Journal ${name} Deleted Successfully` });
        return;
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error });
    }

}

const publishJournal = async (req,res)=>{ //can be optimised
     const {name,published_at,teacher_id} = req.body;
     //get journal
    //  console.log(name,published_at,teacher_id);
    const getJournal = `select * from journal where name = ? and teacher_id = ?` ;
    try{
    const journ  = await db.execute(getJournal,[name,teacher_id]);
    const journal = journ[0][0];
    // console.log(journal);
        if(journal == null){
            return res.json({"message": "Journal does not exist"});
            
        }
        if(journal.published_at == null){

            await db.execute(`update journal set published_at = ? where name = ? and teacher_id = ?`
            ,[published_at,name,teacher_id]);
            return res.json({"message": "Journal published"});
            
        }
        else{
            return res.json({"message": "Journal already published"});
        }
    }
    catch(err){
        return res.json({"Error": err});
    }
}

exports.createJournal = createJournal;
exports.updateJournal = updateJournal;
exports.deleteJournal = deleteJournal;
exports.publishJournal = publishJournal;

