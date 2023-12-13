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
    enum: [ "","Ariana","Beja","Ben Arous","Bizerte","Gabes", "Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine", "Tozeur","Zaghouan","Tunis",
    ],
    required: true,
  },
  nbr_student:Number,
  nbr_teachers: Number,
  nbr_classes:Number,
  type_needs: String,
  needs: String,
  image: String,
  dateConfirmation: Date,
  confirmation: { type: Boolean, default: false },
});

const School = mongoose.model('School', SchoolSchema);

module.exports = School;
