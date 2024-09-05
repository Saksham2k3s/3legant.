const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (user, statusCode, res) => {
    // Payload to be included in the token
    const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
    };

    // Options for the token
    const tokenOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN
    };

    // Generating the token
    const token = jwt.sign(payload, process.env.JWT_SECERET, tokenOptions);


   // Options for cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // set it to process.env.NODE_ENV === "production"
    sameSite: 'None', //Set it to Lax if on localhost
  };


  //Saving the token into cookie and return the response
  res
  .status(statusCode)
  .cookie("token", token, cookieOptions)
  .json({
    success: true,
    user,
    token,
  });
};

module.exports = generateToken;
