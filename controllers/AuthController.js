const User = require("../models/UserModel");
const Admin = require("../models/AdminModel");
const Ambassador = require("../models/AmbassadorModel");
const jwt = require("../config/jwt");
const bcrypt = require("bcrypt");

async function loginUser(req, res) {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginAmbassador(req, res) {
  const { email, password } = req.body;

  try {
    const ambassador = await Ambassador.findOne({ email });
    if (!ambassador || !bcrypt.compareSync(password, ambassador.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.generateToken(ambassador);
    res.json({ token });
  } catch (error) {
    console.error("Error during ambassador login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function loginAdmin(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.generateToken(admin);
    res.json({ token });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { loginUser, loginAmbassador , loginAdmin};
