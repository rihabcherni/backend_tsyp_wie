const Admin = require("../models/AdminModel");

const bcrypt = require('bcrypt');

async function createAdmin(req, res) {
  try {
    // Extract password from the request body
    const { password, ...adminData } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin with the hashed password
    const newAdmin = await Admin.create({ ...adminData, password: hashedPassword });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Admin', details: error.message });
  }
}

// Get all admins
async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error("Error getting admins:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get a specific admin by ID
async function getAdminById(req, res) {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error getting admin by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update an admin by ID
async function updateAdminById(req, res) {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error updating admin by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete an admin by ID
async function deleteAdminById(req, res) {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
