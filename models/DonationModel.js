const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  donationDetails: [{
    itemType: { type: String, required: true },  
    number: { type: Number, required: true },
    description: { type: String },
  }],
  dateDonation: { type: Date, required: true },
});

const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;



