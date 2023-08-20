const jwt = require("jsonwebtoken");
const db  = require("../config/database");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid token format" });
    }
    
    const token = authHeader.split(" ")[1]; 
    
    if (!token) {
        return res.status(401).json({ error: "Invalid Bearer token" });
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken);
        const result = await db.execute(`select * from User where id = ?`,[decodedToken.id]);
        if(result[0].length == 0) return res.status(401).json({error: "Invalid Bearer token, Authentication failed"});
        
        req.id = { userId: decodedToken.id };
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Bearer token, Authentication failed" });
    }
};


