const db = require("../config/database");
const cloudinary = require("cloudinary").v2;
const getDataUri = require("../utils/Datauri.js");
const UUID = require("uuid");
const RelationController = require("../controllers/RelationController")
require('dotenv').config();

const createJournal = async (req, res) => {
    // console.log(req.file);
    const {name,teacher_id,description,students} = req.body;
    const file = req.file;
    let studentsArray = [];
    const id = UUID.v4();

    const isTeacher = await RelationController.TeacherExists(teacher_id);
    if(!isTeacher) return res.json({"error": "Teacher does not exist"});

    const insertJournal = `
        INSERT INTO \`Journal\` (journal_id,name,teacher_id,description,file)
        VALUES (?, ?, ?, ?, ?)
    `;

     // file upload
    let result;
    if( file != null){
   
        const fileUri = getDataUri(id,file);
        try{
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME, 
                api_key: process.env.API_KEY, 
                api_secret: process.env.API_SECRET
            });
            result = await cloudinary.uploader.upload(fileUri.content);

        }
        catch(err){
            console.log(err);
            res.json({"error": "Cloudinary error"});
            return;
        }

    }

    try {
        if(file == null){
            await db.execute(insertJournal, [id,name,teacher_id,description,null]);
            // console.log("helo");
            // return;
        }
        else{
        // console.log( insertJournal, [id,name,teacher_id,description,result.secure_url]);
            await db.execute(insertJournal, [id,name,teacher_id,description,result.secure_url]);    
        }
        
        
    } catch (error) {
        // console.log(error,"hfjdshfjsdjd");
           return res.status(500).json({ "message": "Journal Creation Failed", "error": error });
        
    }
    
    // This is a check to populate the Journal Student Relation table.
    try {
        studentsArray = JSON.parse(students).map(Number);
    } catch (error) {
        console.error("Error parsing students array:", error);
    }

    // console.log(studentsArray[0]);
    let check = await RelationController.populateRelation(id,studentsArray);
    if(!check){
        res.json({"error": "Student doesn't exist"})
        return;
    }

    res.json({"message": "Journal Created Successfully"})
}

const updateJournal = async (req,res)=>{

}

const deleteJournal = async (req,res)=>{
    const {name,teacher_id}  = req.body;
    const deleteJournal = `delete from \`Journal\` where name = ? and teacher_id= ?`
    
    try {
        const result = await db.execute(deleteJournal, [name,teacher_id]);
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
    const getJournal = `select * from \`journal\` where name = ? and teacher_id = ?` ;
    try{
    const journ  = await db.execute(getJournal,[name,teacher_id]);
    const journal = journ[0][0];
    // console.log(journal);
        if(journal == null){
            return res.json({"message": "Journal does not exist"});
            
        }
        if(journal.published_at == null){
            const updateJournal = `update \`journal\` set published_at = ? where name = ? and teacher_id = ?` ;
            const result = await db.execute(updateJournal,[published_at,name,teacher_id]);
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
// exports.updateJournal = updateJournal;
exports.deleteJournal = deleteJournal;
exports.publishJournal = publishJournal;

