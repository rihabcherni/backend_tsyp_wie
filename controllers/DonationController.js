const Donation = require('../models/DonationModel');
const School = require('../models/SchoolModel'); 
const Donor = require('../models/DonorModel'); 

    const createDonation = async (req, res) => {
    try {
        const schoolId = req.body.school;
        const donorId = req.body.donor;
        const school = await School.findById(schoolId);
        if (!school) {
        return res.status(404).json({ success: false, error: 'School not found' });
        }

        const donor = await Donor.findById(donorId);
        if (!donor) {
        return res.status(404).json({ success: false, error: 'Donor not found' });
        }

        const donation = await Donation.create({
        ...req.body,
        school: schoolId,
        });

        res.status(201).json({ success: true, data: donation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
    };
    const getAllDonations = async (req, res) => {
        try {
          const donations = await Donation.find()
          .populate('school', 'name address governorate nbr_student nbr_teachers nbr_classes type_needs needs')
          .populate('donor', 'firstName lastName email').sort({ dateDonation: -1 }); 
          res.status(200).json({ success: true, data: donations });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
      };
      
    const getDonationById = async (req, res) => {
        try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ success: false, error: 'Donation not found' });
        }
        res.status(200).json({ success: true, data: donation });
        } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        }
    };
    const updateDonationById = async (req, res) => {
        try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!donation) {
            return res.status(404).json({ success: false, error: 'Donation not found' });
        }
        res.status(200).json({ success: true, data: donation });
        } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        }
    };
    const deleteDonationById = async (req, res) => {
        try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        if (!donation) {
            return res.status(404).json({ success: false, error: 'Donation not found' });
        }
        res.status(200).json({ success: true, data: {} });
        } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        }
    };
module.exports = {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonationById,
    deleteDonationById,
};