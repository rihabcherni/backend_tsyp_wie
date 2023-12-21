const mongoose = require("mongoose");

const AmbassadorSchema = new mongoose.Schema({
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
  title:{
    type: String,
    enum: ["director", "teacher", "staff"],
    required:true
  },
  ReferencedSchool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required:true
  },
});

const Ambassador = mongoose.model("Ambassador", AmbassadorSchema);

module.exports = Ambassador;

