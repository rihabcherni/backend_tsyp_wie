const mongoose=require("mongoose");
const  DonorSchema=new mongoose.Schema({ 
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    gender:{
        type:String, 
        enum:['Masculin','Feminin'],
    }, 
    email:{
        type:String,
        unique: true ,
        required: true
    },
    governorate:{ 
        type:String, 
        enum:[ "", "Ariana",  "Beja",  "Ben Arous",  "Bizerte",  "Gabes",  "Gafsa",  "Jendouba",  "Kairouan",  "Kasserine",  "Kebili",  "Kef",  "Mahdia",  "Manouba",  "Médenine",  "Monastir",  "Nabeul",  "Sfax",  "Sidi Bouzid",  "Siliana",  "Sousse",  "Tataouine",  "Tozeur",  "Zaghouan", "Tunis"]
    },
    adresse:{
        type:String,
        required: true
    },
    phoneNumber:{ 
        type:String, 
        required: true
    },
    password:{ 
        type:String, 
        required: true
    },
    timeAdded: Date,
    photo:String
})
const Donor = mongoose.model('Donor', DonorSchema);
module.exports = Donor;