const Donor = require('../models/DonorModel'); 
const bcrypt = require('bcrypt');
    async function addDonor (req, res) {
        try {
        // Extract password from the request body
        const { password, ...donorData } = req.body;
    
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new donor with the hashed password
        const newDonor = new Donor({ ...donorData, password: hashedPassword });
        await newDonor.save();
    
        res.status(201).json(newDonor);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    };
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
      