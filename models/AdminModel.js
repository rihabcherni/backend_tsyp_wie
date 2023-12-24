const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required:true
  },
  lastName:{
    type: String,
    required:true
  },
  gender: {
    type: String,
    enum: ["masculin", "feminin"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  governorate: {
    type: String,
    enum: [
      "",
      "Ariana",
      "Beja",
      "Ben Arous",
      "Bizerte",
      "Gabes",
      "Gafsa",
      "Jendouba",
      "Kairouan",
      "Kasserine",
      "Kebili",
      "Kef",
      "Mahdia",
      "Manouba",
      "Médenine",
      "Monastir",
      "Nabeul",
      "Sfax",
      "Sidi Bouzid",
      "Siliana",
      "Sousse",
      "Tataouine",
      "Tozeur",
      "Zaghouan",
      "Tunis",
    ],
  },
  address: {
    type: String,
    required:true
  },
  phoneNumber:{
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  photo:String
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
