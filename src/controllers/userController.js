const bcrypt = require("bcrypt");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
    
    const { username , password,email, type} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = `
        INSERT INTO \`User\` (type,username,email,password)
        VALUES (?, ?, ?, ?)
    `;

    try {
        const [results, fields] = await db.execute(insertUserQuery, [type, username, email , hashedPassword ]);
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
        res.json({"error": "Invalid credentials, could not log you in."})
    } 
    else {
        // console.log(existingUser.password,password);
      const pass = await bcrypt.compare(password, existingUser.password);
      if (!pass) {
        res.json({"error": "Invalid credentials, could not log you in."})
      }
    }

    let token = jwt.sign(
        { password: existingUser.id, email: existingUser.email },
        "supersecret_dont_share"
      );

    // console.log(existingUser.id + " " + "possible?");
  
    res.json({token});
}

const getusers = async (req, res) => {
    let getusers = await db.execute("SELECT * FROM User");
    // console.log(getusers[0]);
    res.json(getusers[0]);
}


exports.signup = signup;
exports.login = login;
exports.getusers = getusers;
