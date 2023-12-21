const Donor = require('../models/DonorModel'); 
const bcrypt = require('bcrypt');
const Token = require("../models/TokenModel");
const jwt = require("jsonwebtoken");
const path = require('path');
const multer = require('multer');

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
const addDonor = [uploadUserPhoto.single('photo'), async (req, res) => {
  try {
    const existingDonor = await Donor.findOne({ email: req.body.email });
    if (existingDonor) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const { password, ...donorData } = req.body;
    let photo;
    if (req.file) {
      photo = req.file.filename;
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDonor = new Donor({ ...donorData, password: hashedPassword, photo:photo });
      await newDonor.save();

      const token = generateToken(newDonor);
      const tokenDocument = new Token({ value: token });
      await tokenDocument.save();

      return res.json({
        token,
        role: 'Donor',
        newDonor: {
          id: newDonor._id,
          firstName: newDonor.firstName,
          lastName: newDonor.lastName,
          gender: newDonor.gender,
          email: newDonor.email,
          governorate: newDonor.governorate,
          address: newDonor.address,
          phoneNumber: newDonor.phoneNumber,
          photo: photo,
        },
      });
  } catch (error) {
    console.error('Error adding donor:', error);
    return res.status(400).json({ error: error.message });
  }
}];

    async function getAllDonor(req, res) {
        try {
            const donor = await Donor.find();
            res.status(200).json({ success: true, data: donor });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    async function getDonorDetails (req, res) {
        try {
                   
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    async function updateDonor(req, res) {
        try {
          
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    async function deleteDonor(req, res) {
        const { donorId } = req.params;
        try {
          const deletedDonor = await Donor.findByIdAndDelete(donorId);
          if (!deletedDonor) {
            res.status(404).json({ error: 'Donor not found' });
          } else {
            res.status(200).json(deletedDonor);
          }
        } catch (error) {
          console.error('Error deleting donor:', error.message);
          res.status(500).json({ error: 'Error deleting donor', details: error.message });
        }
    }
      
      module.exports = {
        addDonor,
        getAllDonor,
        getDonorDetails,
        updateDonor,
        deleteDonor
      };
      