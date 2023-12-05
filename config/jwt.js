const jwt = require("jsonwebtoken");

function generateToken(user) {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: user._id, // Assuming you have a user ID to include in the token
    };

    const token = jwt.sign(data, jwtSecretKey);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error; // Rethrow the error for handling in the calling function
  }
}

module.exports = { generateToken };

