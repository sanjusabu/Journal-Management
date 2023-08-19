const bcrypt = require("bcrypt");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
    
    const { username , password, email, type} = req.body;
    
    let existingUser;
    let userexists = await db.execute("SELECT * FROM User WHERE email = ?", [email]);
    existingUser =  userexists[0][0];

    if(existingUser) return res.status(500).json({"error": "User already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.execute( `INSERT INTO User (type,username,email,password) VALUES (?, ?, ?, ?)`, [type, username, email , hashedPassword ]);
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "User registration failed" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    // const errors = validationResult(req)
  
    let existingUser;
    let userexists = await db.execute("SELECT * FROM User WHERE email = ?", [email]);
    existingUser =  userexists[0][0];

    if (userexists[0].length==0) {
        return res.status(401).json({"error": "Invalid credentials, could not log you in."})
    } 
    else {
        // console.log(existingUser.password,password);
      const pass = await bcrypt.compare(password, existingUser.password);
      if (!pass) {
        return res.status(401).json({"error": "Invalid credentials, could not log you in."})
      }
    }

    let token = jwt.sign(
        { password: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
      );

    // console.log(existingUser.id + " " + "possible?");
  
    res.json({token, userid: existingUser.id});
}

// const getusers = async (req, res) => {
//     let getusers = await db.execute("SELECT * FROM User");
//     // console.log(getusers[0]);
//     res.json(getusers[0]);
// }


exports.signup = signup;
exports.login = login;
// exports.getusers = getusers;
