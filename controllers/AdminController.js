const Admin = require("../models/AdminModel");
const bcrypt = require('bcrypt');

async function createAdmin(req, res) {
  try {
    const { password, ...adminData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ ...adminData, password: hashedPassword })
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Admin', details: error.message });
  }
}
async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error("Error getting admins:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
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
async function updateAdminById(req, res) {
  const { id } = req.params;
  try {
    const { password, ...adminData } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      adminData.password = hashedPassword;
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      adminData,
      { new: true }
    );
    if (!updatedAdmin) {
      res.status(404).json({ error: 'Admin not found' });
    } else {
      res.status(200).json(updatedAdmin);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Admin', details: error.message });
  }
}
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

async function updateAdminPassword(req, res) {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid old password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating password', details: error.message });
  }
}
module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  updateAdminPassword,
};