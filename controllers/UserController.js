const User = require('../models/UserModel'); 
const bcrypt = require('bcrypt');
exports.addUser = async (req, res) => {
    try {
      // Extract password from the request body
      const { password, ...userData } = req.body;
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = new User({ ...userData, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
    exports.getAllUser= async (req, res) => {
        try {
            const user = await user.find();
            res.status(200).json(user);   
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    exports.getUserDetails = async (req, res) => {
        try {
                   
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    exports.updateUser= async (req, res) => {
        try {
          
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    exports.deleteUser= async (req, res) => {
        try {
          
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
