const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  governorate: {
    type: String,
    enum:[ "", "Ariana",  "Beja",  "Ben Arous",  "Bizerte",  "Gabes",  "Gafsa",  "Jendouba",  "Kairouan",  "Kasserine",  "Kebili",  "Kef",  "Mahdia",  "La Manouba",  "Médenine",  "Monastir",  "Nabeul",  "Sfax",  "Sidi Bouzid",  "Siliana",  "Sousse",  "Tataouine",  "Tozeur",  "Zaghouan", "Tunis"],
    required: true,
  },
  niveau:{
    type: String,
    enum: [ "","PrimarySchool","MiddleSchool","HighSchool","University","Other"],
    required: true,
  },
  nbr_student:String,
  nbr_teachers: String,
  nbr_classes:String,
  type_needs: String,
  needs: String,
  image: String,
  dateConfirmation: Date,
  confirmation: { type: Boolean, default: false },
});

const School = mongoose.model('School', SchoolSchema);

module.exports = School;
