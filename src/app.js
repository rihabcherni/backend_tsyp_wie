const express = require('express');
const bodyParser = require('body-parser');
const ambassadorRouter = require('../routes/AmbassadorRouter');
const authRoutes = require("../routes/AuthRouter");
const adminRouter = require("../routes/AdminRouter");
const schoolRouter = require('../routes/SchoolRouter');
const app = express();
const port = 5000;
require ('dotenv').config();
const db= require('../config/bd')
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.send('Hello wie tsyp challenge!');
});
app.use('/school', schoolRouter); 
const userRouter= require("../routes/UserRouter")
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/ambassador', ambassadorRouter);
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header("Authorization").replace("Bearer ","");
        //console.log("Received token:", token);
        
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            // Token is valid, move to the next middleware or route handler
            next();
        } else {
            // Token is invalid, access denied
            return res.status(401).json({ error: "Access denied. Invalid token." });
        }
    } catch (error) {
        // Error during token verification, access denied
        return res.status(401).json({ error: "Access denied. error during verification  Invalid token." });
    }
}

// Assuming you have a list of blacklisted tokens
const blacklistedTokens = new Set();

// Middleware to check if a token is blacklisted
function isTokenBlacklisted(req, res, next) {
  const token = req.header('Authorization');
  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
app.use("/auth", authRoutes);
app.get("/ambassador-dashboard", isTokenBlacklisted, authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the ambassador dashboard!" });
});
app.get("/admin", isTokenBlacklisted, authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});
// Apply the middleware to protected routes
app.get("/dashboard", isTokenBlacklisted, authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the user dashboard!" });
});

// When a user logs out, add their token to the blacklist
function logoutUser(req, res) {
  const token = req.header('Authorization');
  blacklistedTokens.add(token);
  res.json({ message: 'Logout successful' });
}

// Route to handle user logout
app.post('/logout', logoutUser);

