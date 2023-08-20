const db = require("../config/database");
const UUID = require("uuid");
require('dotenv').config();
const fileUpload = require("../utils/fileUpload");
const RelationController = require("./relationController");
const e = require("express");
const notifier = require("../utils/Notification")

const createJournal = async (req, res) => {
    // console.log(req.file);
    const {name,description,student_ids} = req.body;
    const teacher_id = req.id.userId;
    const file = req.file;
    let studentsArray = student_ids.split(",");

    console.log(teacher_id);
    const id = UUID.v4();

    const isTeacher = await RelationController.TeacherExists(teacher_id);
    if(!isTeacher) return res.status(500).json({"error": "Teacher does not exist"});
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
        // studentsArray = JSON.parse(student_ids).map(Number);
        // console.log(studentsArray,typeof(studentsArray));
        let check = await RelationController.populateRelation(id,studentsArray);
        if(!check) return res.status(500).json({"error": "Students to be notified do not exist", "message": "Private Journal Created"})

    } catch (error) {
        return res.status(500).json(error);
    }

    res.status(200).json({"message": "Journal Created Successfully"})
}

const updateJournal = async (req,res)=>{
    const {journal_id,name,description} = req.body;
  
    let journal;
    //
    try{
        const result  =  await db.execute("select * from Journal where journal_id = ?",[journal_id]);
        journal = result[0][0];
        // console.log(journal);
        if(journal.length==0 || journal == null) return res.status(500).json({"message": "Journal does not exist"});
    }
    catch(err){
        return res.status(500).json({"Error": "Journal does not exist"});
    }

    if(name != null){
        try{
            const result  =  await db.execute("select * from Journal where name =  ?",[name]);
            if(result[0].length != 0) return res.json({"message": "Journal name already exists,try a different name"});

            if(description != null){
                await db.execute(`update Journal set name = ?,description = ? where journal_id = ?`
                ,[name,description,journal_id]);
            }
            else{
                await db.execute(`update Journal set name = ? where journal_id = ?`,
                [name,journal_id]);
            }
        }
        catch(err){
            return res.status(500).json({"Error": err});
        }
    }
    else if(description != null){
        try{
            await db.execute(`update Journal set description = ? where journal_id = ?`
            ,[description,journal_id]);
        }
        catch(err){
            return res.status(500).json({"Error": err});
        }
    }

    res.json({"message": "Journal Updated Successfully"});
    //name update error
}

const deleteJournal = async (req,res)=>{
    const {journal_id}  = req.body;
    try {
        const result = await db.execute(`delete from Journal where journal_id = ?`, [journal_id]);

        if(result[0].affectedRows == 0) return res.status(500).json({"message": "Journal does not exist"});
        res.status(200).json({ message: `Journal ${journal_id} Deleted Successfully` });
        return;
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error });
    }

}

const publishJournal = async (req,res)=>{ //can be optimised
     const {journal_id,published_at} = req.body;
     //get journal
    //  console.log(name,published_at,teacher_id);
    const getJournal = `select * from Journal where journal_id = ?` ;
    try{
    const journ  = await db.execute(getJournal,[journal_id]);
    const journal = journ[0][0];
    // console.log(journal);
        if(journal == null){
            return res.status(500).json({"message": "Journal does not exist"});
            
        }
        if(journal.published_at == null){

            await db.execute(`update Journal set published_at = ? where journal_id = ?`
            ,[published_at,journal_id]);

            // const date1 = new Date(published_at);
            // const date2  = new Date();
            // if( date1 <= date2) notifier.notify(journal_id);

            return res.status(200).json({"message": "Journal published"});
            
        }
        else{
            return res.status(500).json({"message": "Journal already published"});
        }
    }
    catch(err){
        return res.status(500).json({"Error": err});
    }
}

exports.createJournal = createJournal;
exports.updateJournal = updateJournal;
exports.deleteJournal = deleteJournal;
exports.publishJournal = publishJournal;

