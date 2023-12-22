const Ambassador = require('../models/AmbassadorModel');
const bcrypt = require('bcrypt');
const Token = require("../models/TokenModel");
const jwt = require("jsonwebtoken");
const path = require('path');
const multer = require('multer');
const School = require('../models/SchoolModel');

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
const uploadUserPhoto = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 7, 
  },
});
const createAmbassador = [uploadUserPhoto.single('photo'), async (req, res) => {
  try {
    const existingAmbassador = await Ambassador.findOne({ email: req.body.email });
    if (existingAmbassador) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const { password, ...ambassadorData } = req.body;
    let photo;
    if (req.file) {
      photo = req.file.filename;
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAmbassador = new Ambassador({ ...ambassadorData, password: hashedPassword, photo:photo });
      await newAmbassador.save();

      const token = generateToken(newAmbassador);
      const tokenDocument = new Token({ value: token });
      await tokenDocument.save();

      return res.json({
        token,
        role: 'Ambassador',
        newAmbassador: {
          id: newAmbassador._id,
          firstName: newAmbassador.firstName,
          lastName: newAmbassador.lastName,
          gender: newAmbassador.gender,
          email: newAmbassador.email,
          governorate: newAmbassador.governorate,
          address: newAmbassador.address,
          phoneNumber: newAmbassador.phoneNumber,
          photo: photo,
        },
      });
  } catch (error) {
    console.error('Error adding Ambassador:', error);
    return res.status(400).json({ error: error.message });
  }
}];

async function getAllAmbassadors(req, res) {
  try {
    const ambassadors = await Ambassador.find();
    const schoolPromises = ambassadors.map(async (ambassador) => {
      const school = await School.findById(ambassador.ReferencedSchool);
      return { ambassador, school };
    });

    const ambassadorSchoolPairs = await Promise.all(schoolPromises);

    res.status(200).json({ ambassadorSchoolPairs });
  } catch (error) {
    res.status(500).json({ error: 'Error getting Ambassadors', details: error.message });
  }
}

async function getAmbassadorById(req, res) {
  const { id } = req.params;
  try {
    const ambassador = await Ambassador.findById(id);
    if (!ambassador) {
      res.status(404).json({ error: 'Ambassador not found' });
    } else {
      res.status(200).json(ambassador);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting Ambassador', details: error.message });
  }
}
async function updateAmbassadorById(req, res) {
  const { id } = req.params;
  try {
    const { password, ...ambassadorData } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      ambassadorData.password = hashedPassword;
    }

    const updatedAmbassador = await Ambassador.findByIdAndUpdate(
      id,
      ambassadorData,
      { new: true }
    );

    if (!updatedAmbassador) {
      res.status(404).json({ error: 'Ambassador not found' });
    } else {
      res.status(200).json(updatedAmbassador);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Ambassador', details: error.message });
  }
}
async function deleteAmbassadorById(req, res) {
  const { id } = req.params;
  try {
    const deletedAmbassador = await Ambassador.findByIdAndDelete(id);
    if (!deletedAmbassador) {
      res.status(404).json({ error: 'Ambassador not found' });
    } else {
      res.status(200).json(deletedAmbassador);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Ambassador', details: error.message });
  }
}

module.exports = {
  createAmbassador,
  getAllAmbassadors,
  getAmbassadorById,
  updateAmbassadorById,
  deleteAmbassadorById,
};
