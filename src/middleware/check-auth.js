const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
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

        req.userData = { userId: decodedToken.userId };
        // res.status(200).json({message: "Authenticated user"});
        next();
    } catch (error) {
        return res.status(401).json({ error: "Inavlid Bearer token, Authentication failed" });
    }
};


