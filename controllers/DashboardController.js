const Donation = require('../models/DonationModel');
const School = require('../models/SchoolModel'); 
const Donor = require('../models/DonorModel'); 
const Ambassador = require('../models/AmbassadorModel'); 
const mongoose = require('mongoose');

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
        const result = await School.aggregate([
            {
                $group: {
                    _id: { $year: "$dateConfirmation" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);
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


const StatistiquesDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const donations = await Donation.countDocuments({ donor: donorId });
        const allDonations= await Donation.countDocuments();
        const school = await Donation.distinct('school', { donor: donorId });
        const uniqueSchoolsCount =school.length;
        const allSchools= await School.countDocuments();
        const donors = await Donor.countDocuments();
        data={
            nb_allDonations: allDonations,
            nb_unique_donations: donations,
            nb_unique_schools: uniqueSchoolsCount,
            nb_schools: allSchools,
            nb_donors: donors,
        }
        res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};
const lastDonationDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const last5Donations = await Donation.find({ donor: donorId }).populate('school', 'name')
        .populate('donor', 'firstName lastName').sort({ dateDonation: -1 }).limit(10); 
        res.json(last5Donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const lastSchoolDonor = async (req, res) => {
    try {
        const last5School = await School.find().sort({ timeAdded: -1 }).limit(10); 
        res.json(last5School);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const DonationStatisticsByYearDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const result = await Donation.aggregate([
            {
                $match: { donor: new mongoose.Types.ObjectId(donorId) }
            },
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

module.exports = {
    StatistiquesAdmin,
    SchoolStatisticsByYear,
    DonationStatisticsByYear,
    lastDonationAdmin,
    lastDonorAdmin,

    StatistiquesDonor,
    lastDonationDonor,
    lastSchoolDonor,
    DonationStatisticsByYearDonor,
};