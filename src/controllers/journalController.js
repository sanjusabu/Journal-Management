const db = require("../config/database");
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
const getDataUri = require("../utils/Datauri.js");
const UUID = require("uuid");
const RelationController = require("../controllers/RelationController")

const createJournal = async (req, res) => {
    // console.log(req.file);
    const {name,teacher_id,description,students} = req.body;
    const file = req.file;
    let studentsArray = [];
    const id = UUID.v4();

    try {
        studentsArray = JSON.parse(students).map(Number);
    } catch (error) {
        console.error("Error parsing students array:", error);
    }

    // console.log(studentsArray[0]);

    if(!RelationController.populateRelation(id,studentsArray)){
        res.json({"error": "Error in inserting into Relation Table"})
        return;
    }
    else{
        res.json({"message": "Insertion into Relation Table Successful"})
    }

//     const insertJournal = `
//         INSERT INTO \`Journal\` (journal_id,name,teacher_id,description,file)
//         VALUES (?, ?, ?, ?, ?)
//     `;

//     // teacher exists

//     let teacherexists = await db.execute("SELECT * FROM User WHERE id = ? and type = ?", [teacher_id,"Teacher"]);
    
//     if (teacherexists[0].length==0) {
//         res.status(500).json({"error": "Teacher does not exist"});
//         return;
//     }

//     // console.log(teacherexists[0][0]);

//      // file upload

//     if( file != null){
   
//     const fileUri = getDataUri(id,file);
//     let result;
//     try{
//     cloudinary.config({
//         cloud_name: process.env.CLOUD_NAME, 
//         api_key: process.env.API_KEY, 
//         api_secret: process.env.API_SECRET
//       });
//     result = await cloudinary.uploader.upload(fileUri.content);

//     }
//     catch(err){
//         console.log(err);
//         res.json({"error": "Cloudinary error"});
//         return;
//     }

// }
//     // console.log("result",result);

//     try {
//         if(file == null){
//             await db.execute(insertJournal, [id,name,teacher_id,description,null]);
//             res.status(200).json({ message: "Journal Created Successfully" });
//             return;
//         }
//         else{
//         await db.execute(insertJournal, [id,name,teacher_id,description,result.secure_url]);
//         res.status(200).json({ message: "Journal Created Successfully" });
//         return;
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Journal Creation Failed", "error": error });
//     }
    
}

const updateJournal = async (req,res)=>{

}

const deleteJournal = async (req,res)=>{
    const {journal_id,teacher_id}  = req.body;
    const deleteJournal = `delete from \`Journal\` where journal_id = ? and teacher_id= ?`
    
    try {
        const result = await db.execute(deleteJournal, [journal_id,teacher_id]);
        // console.log(result[1]);
        res.status(200).json({ message: `Journal ${journal_id} Deleted Successfully` });
        return;
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error });
    }

}
const getallJournals = async (req,res)=>{
    const selectJournal = `select * from \`Journal\` `
    
    try {
        const results = await db.execute(selectJournal);

        res.status(200).json({ Journals: results[0]});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
const teacherJournals = async (req,res)=>{
    const {teacher_id}  = req.body;
    const selectJournal = `select * from \`Journal\` where teacher_id = ?`
    
    try {
        const results = await db.execute(selectJournal,[teacher_id]);

        res.status(200).json({ Journals: results[0]});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.createJournal = createJournal;
// exports.updateJournal = updateJournal;
exports.deleteJournal = deleteJournal;
exports.getJournals = getallJournals;
exports.teacherJournals = teacherJournals;

