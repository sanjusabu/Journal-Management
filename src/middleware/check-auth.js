const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  
    const token = req.headers.token; // Authorization: 'Bearer TOKEN'
    console.log(token);
    if (!token) {
      res.json({"error": "Invalid token"})
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    console.log(decodedToken);
    req.userData = { userId: decodedToken.userId };
    next();
};
