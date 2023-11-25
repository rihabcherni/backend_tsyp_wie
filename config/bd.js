const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log('error:'+err.message);
});
