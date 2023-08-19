const cloudinary = require("cloudinary").v2;
const getDataUri =  require("./Datauri")
require('dotenv').config();


const Uploadfile = async (id,file)=>{
    let result
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
        return res.json({"error": "Cloudinary error"});
    }

    return result;
}

exports.Uploadfile = Uploadfile;