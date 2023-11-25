const mongoose=require("mongoose");
const  UserSchema=new mongoose.Schema({ 
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    gender:{
        type:String, 
        enum:['Masculin','Feminin'],
    }, 
    email:{
        type:String,
    },
    governorate:{ 
        type:String, 
        enum:[ "", "Ariana",  "Beja",  "Ben Arous",  "Bizerte",  "Gabes",  "Gafsa",  "Jendouba",  "Kairouan",  "Kasserine",  "Kebili",  "Kef",  "Mahdia",  "Manouba",  "Médenine",  "Monastir",  "Nabeul",  "Sfax",  "Sidi Bouzid",  "Siliana",  "Sousse",  "Tataouine",  "Tozeur",  "Zaghouan", "Tunis"]
    },
    phoneNumber:{ 
        type:String, 
    },
    password:{ 
        type:String, 
    },
})
const User = mongoose.model('User', UserSchema);
module.exports = User;