const Donor = require("../models/DonorModel");
const Admin = require("../models/AdminModel");
const Ambassador = require("../models/AmbassadorModel");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const Token = require("../models/TokenModel");
const jwt = require("jsonwebtoken");
const School = require("../models/SchoolModel");

function generateToken(user) {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: user._id, 
      user: user,
    };

    const token = jwt.sign(data, jwtSecretKey);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error; 
  }
}
const blacklistedTokens = new Set();
function isTokenBlacklisted(req, res, next) {
  const token = req.header('Authorization');
  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  const isBlacklisted = await Token.exists({ value: token });

  if (isBlacklisted) {
    return res.status(401).json({ auth: false, message: 'Token has been revoked.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    let user;
    let userModel;
    let school_id ; 
    let school ; 
    if ((userDonor = await Donor.findOne({ email }))) {
      user = userDonor;
      userModel = 'Donor';
    } else if ((userAdmin = await Admin.findOne({ email }))) {
      user = userAdmin;
      userModel = 'Admin';
    } else if ((userAmbassador = await Ambassador.findOne({ email }))) {
      user = userAmbassador;
      userModel = 'Ambassador';
      school_id=userAmbassador.ReferencedSchool;
      school= await School.findById(school_id);
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    const tokenDocument = new Token({ value: token });
    await tokenDocument.save(); 
    if(userModel=='Ambassador')  {
      res.json({ token, role: userModel, user: user, school:school });
    }else{
      res.json({ token, role: userModel, user: user });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function logout(req, res) {
  try {
    const token = req.headers['authorization'];
    await Token.findOneAndDelete({ value: token });
    blacklistedTokens.add(token);
    res.json({ message: 'Logout successful', token: null });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
const storage = multer.diskStorage({
    destination: 'uploads/userProfile',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
const uploadUserProfile = multer({ storage: storage, fileFilter: fileFilter });

const addImageProfile = [uploadUserProfile.single('photo'), async (req, res) => {
  try {
      const userId = req.params.userId;

      let user;
      if ((userDonor = await Donor.findById(userId))) {
        user = userDonor;
        userModel = 'Donor';
      } else if ((userAdmin = await Admin.findById(userId))) {
        user = userAdmin;
        userModel = 'Admin';
      } else if ((userAmbassador = await Ambassador.findById(userId))) {
        user = userAmbassador;
        userModel = 'Ambassador';
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (req.file) {
          user.photo = req.file.filename;
      }

      await user.save();
      res.json({ message: 'Profile image updated successfully' });
      return;
  } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}];

module.exports = { login, logout,  addImageProfile};
