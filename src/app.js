const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
require ('dotenv').config();
const db= require('../config/bd')
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true, 
}));
app.use(bodyParser.json());

const ambassadorRouter = require('../routes/AmbassadorRouter');
const authRoutes = require("../routes/AuthRouter");
const adminRouter = require("../routes/AdminRouter");
const schoolRouter = require('../routes/SchoolRouter');
const donorRouter= require("../routes/DonorRouter")
const donationRouter= require("../routes/DonationRouter")
const dashboardRouter= require("../routes/DashboardRouter")
const ContactRouter= require("../routes/ContactRouter")

app.get('/', (req, res) => {
res.send('Hello wie tsyp challenge!');
});
app.use('/school', schoolRouter); 
app.use('/donor',donorRouter);
app.use('/donation',donationRouter);
app.use('/admin',adminRouter);
app.use('/ambassador', ambassadorRouter);
app.use('/dashboard', dashboardRouter);
app.use('/uploads', express.static('uploads'));
app.use("/auth", authRoutes);
app.use("/contact", ContactRouter);

app.use(express.static('uploads'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
