const School = require('../models/SchoolModel');

// Create a new school
async function createSchool(req, res) {
  try {
    const newSchool = await School.create(req.body);
    res.status(201).json(newSchool);
  } catch (error) {
    console.error('Error creating school:', error.message);
    res.status(500).json({ error: 'Error creating school', details: error.message });
  }
}

// Get all schools
async function getAllSchools(req, res) {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    console.error('Error getting schools:', error.message);
    res.status(500).json({ error: 'Error getting schools', details: error.message });
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

// Update school by ID
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

// Delete school by ID
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

module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
};
