const User = require('../models/UserModel'); 
    exports.addUser= async (req, res) => {
        try {
            const userData = req.body;
            const user = new User(userData);
            await user.save();
            res.status(201).json(user);
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
