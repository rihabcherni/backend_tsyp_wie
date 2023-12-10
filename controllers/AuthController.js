const Donor = require("../models/DonorModel");
const Admin = require("../models/AdminModel");
const Ambassador = require("../models/AmbassadorModel");
const jwt = require("../config/jwt");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    let user;
    let userModel;
    if ((userDonor = await Donor.findOne({ email }))) {
      user = userDonor;
      userModel = 'Donor';
    } else if ((userAdmin = await Admin.findOne({ email }))) {
      user = userAdmin;
      userModel = 'Admin';
    } else if ((userAmbassador = await Ambassador.findOne({ email }))) {
      user = userAmbassador;
      userModel = 'Ambassador';
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.generateToken(user);
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      governorate: user.governorate,
      adresse: user.adresse,
      photo: user.photo,
      phoneNumber: user.phoneNumber,
    };    

    res.json({ token, role: userModel, user: userData });
  } catch (error) {
    console.error("Error during login:", error.message);
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

module.exports = { login,  addImageProfile};
