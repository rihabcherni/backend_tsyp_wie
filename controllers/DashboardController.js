const Donation = require('../models/DonationModel');
const School = require('../models/SchoolModel'); 
const Donor = require('../models/DonorModel'); 
const Ambassador = require('../models/AmbassadorModel'); 

const StatistiquesAdmin = async (req, res) => {
    try {
        const donations = await Donation.countDocuments();
        const schools= await School.countDocuments();
        const donors = await Donor.countDocuments();
        const ambassadors = await Ambassador.countDocuments();
        data={
            nb_donations: donations,
            nb_schools: schools,
            nb_donors: donors,
            nb_ambassadors: ambassadors,
        }
        res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};
const SchoolStatisticsByYear = async (req, res) => {
    try {
        // Use the aggregation framework to group schools by year and count them
        const result = await School.aggregate([
            {
                $group: {
                    _id: { $year: "$dateConfirmation" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by year in ascending order
            }
        ]);

        // Transform the result for better readability
        const statisticsByYear = result.map(item => ({
            year: item._id,
            numberOfSchools: item.count
        }));

        res.status(200).json({ success: true, data: statisticsByYear });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const DonationStatisticsByYear = async (req, res) => {
    try {
        const result = await Donation.aggregate([
            {
                $group: {
                    _id: { $year: "$dateDonation" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);

        const statisticsByYear = result.map(item => ({
            year: item._id,
            numberOfDonations: item.count
        }));

        res.status(200).json({ success: true, data: statisticsByYear });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const lastDonationAdmin = async (req, res) => {
    try {
        const last5Donations = await Donation.find()
        .populate('school', 'name')
        .populate('donor', 'firstName lastName').sort({ dateDonation: -1 }).limit(10); 

        res.json(last5Donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const lastDonorAdmin = async (req, res) => {
    try {
        const last5Donors = await Donor.find().sort({ timeAdded: -1 }).limit(10); 

        res.json(last5Donors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    StatistiquesAdmin,
    SchoolStatisticsByYear,
    DonationStatisticsByYear,
    lastDonationAdmin,
    lastDonorAdmin
};