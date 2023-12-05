const mongoose = require("mongoose");
const Ambassador = require("./AmbassadorModel"); 
const School = require("./SchoolModel"); 
const Clothes = require("./ClotheModel");
const Transactions = require("./TransactionModel"); 

const DonationSchema = new mongoose.Schema({
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  School: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
    required: true,
  },
  type_donation: {
    type: String,
    enum: ["clothes", "books", "transactions"], // Add more types as needed
  },
  donatedItems: [
    {
      itemType: {
        type: String,
        enum: ["clothes", "books", "transactions"], // Corresponding to the types above
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "donatedItems.itemType",
      },
    },
  ],
});

const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;
