const Ambassador = require('../models/AmbassadorModel');
const School = require('../models/SchoolModel');
const path = require('path');
const multer = require('multer');
const { now } = require('mongoose');
const storage = multer.diskStorage({
  destination: 'uploads/school',
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
const uploadSchoolPhoto = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 7, 
  },
});
const createSchool = [uploadSchoolPhoto.single('image'), async (req, res) => {
  try {
    const existingSchool = await School.findOne({ name: req.body.name });
    if (existingSchool) {
      return res.status(400).json({ error: 'school already exists' });
    }
    let image;
    if (req.file) {
      image = req.file.filename;
    }

    const newSchool = new School({ ...req.body, image:image });
    await newSchool.save();
    res.status(201).json({school:newSchool});
  } catch (error) {
    console.error('Error creating school:', error.message);
    res.status(500).json({ error: 'Error creating school', details: error.message });
  }
}];
async function getAllSchools(req, res) {
  try {
    const schools = await School.find().where({confirmation: true});
    const schoolsWithAmbassadors = [];
    for (const school of schools) {
      const ambassadors = await Ambassador.find({ ReferencedSchool: school.id });
      schoolsWithAmbassadors.push({
        school,
        ambassadors,
      });
    }
    res.status(200).json({ schoolsWithAmbassadors });
  } catch (error) {
    console.error('Error getting schools and ambassadors:', error.message);
    res.status(500).json({ error: 'Error getting schools and ambassadors', details: error.message });
  }
}
async function getAllSchoolsDemande(req, res) {
  try {
    const schools = await School.find().where({confirmation: false});
    const schoolsWithAmbassadors = [];
    for (const school of schools) {
      const ambassadors = await Ambassador.find({ ReferencedSchool: school.id });
      schoolsWithAmbassadors.push({
        school,
        ambassadors,
      });
    }
    res.status(200).json({ schoolsWithAmbassadors });
  } catch (error) {
    console.error('Error getting schools and ambassadors:', error.message);
    res.status(500).json({ error: 'Error getting schools and ambassadors', details: error.message });
  }
}
async function getSchoolById(req, res) {
  const { id } = req.params;
  try {
    const school = await School.findById(id);
    if (!school) {
      res.status(404).json({ error: 'School not found' });
    } else {
      res.status(200).json(school);
    }
  } catch (error) {
    console.error('Error getting school:', error.message);
    res.status(500).json({ error: 'Error getting school', details: error.message });
  }
}
async function updateSchoolById(req, res) {
  const { id } = req.params;
  try {
    const updatedSchool = await School.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSchool) {
      res.status(404).json({ error: 'School not found' });
    } else {
      res.status(200).json(updatedSchool);
    }
  } catch (error) {
    console.error('Error updating school:', error.message);
    res.status(500).json({ error: 'Error updating school', details: error.message });
  }
}
async function deleteSchoolById(req, res) {
  const { id } = req.params;
  try {
    const deletedSchool = await School.findByIdAndDelete(id);
    if (!deletedSchool) {
      res.status(404).json({ error: 'School not found' });
    } else {
      res.status(200).json(deletedSchool);
    }
  } catch (error) {
    console.error('Error deleting school:', error.message);
    res.status(500).json({ error: 'Error deleting school', details: error.message });
  }
}
async function acceptSchool(req, res) {
  const { id } = req.params;
  try {
    const updatedSchool = await School.findByIdAndUpdate(id, {$set: { confirmation:true,dateConfirmation: now() }},{ new: true });

    if (!updatedSchool) {
      return res.status(404).json({ error: 'School not found' });
    }
    const ambassadors = await Ambassador.findOneAndUpdate(
      { ReferencedSchool: updatedSchool._id }, { $set: { confirmation:true,dateConfirmation: now()  } },{ new: true } );
    res.status(200).json({ updatedSchool, ambassadors });
  } catch (error) {
    console.error('Error updating school:', error.message);
    res.status(500).json({ error: 'Error updating school', details: error.message });
  }
}

module.exports = {
  createSchool,
  acceptSchool,
  getAllSchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
  getAllSchoolsDemande,
};
