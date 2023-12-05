const Ambassador = require('../models/AmbassadorModel');
const bcrypt = require('bcrypt');
// Create a new Ambassador
async function createAmbassador(req, res) {
    try {
      // Extract password from the request body
      const { password, ...ambassadorData } = req.body;
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new ambassador with the hashed password
      const newAmbassador = await Ambassador.create({ ...ambassadorData, password: hashedPassword });
  
      res.status(201).json(newAmbassador);
    } catch (error) {
      res.status(500).json({ error: 'Error creating Ambassador', details: error.message });
    }
}

// Get all Ambassadors
async function getAllAmbassadors(req, res) {
  try {
    const ambassadors = await Ambassador.find();
    res.status(200).json(ambassadors);
  } catch (error) {
    res.status(500).json({ error: 'Error getting Ambassadors', details: error.message });
  }
}

// Get Ambassador by ID
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

// Update Ambassador by ID
async function updateAmbassadorById(req, res) {
  const { id } = req.params;
  try {
    const updatedAmbassador = await Ambassador.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAmbassador) {
      res.status(404).json({ error: 'Ambassador not found' });
    } else {
      res.status(200).json(updatedAmbassador);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Ambassador', details: error.message });
  }
}

// Delete Ambassador by ID
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
