const catchAsyncError = require("../middlewares/catchAsyncError");
const UserModel = require("../models/userModel");
const bycrpt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { userApiResponse } = require("../utils/responseUtils");
const errorHandler = require("../utils/errorHandler");
const productModel = require("../models/productModel");
const cloudinary = require('cloudinary')

// Registering new user
exports.userRegister = catchAsyncError(async (req, res, next) => {
  const { name, username, email, password } = req.body;
   console.log("We have get this for registration", req.body);

   
  try {
    if (!name || !username || !email || !password) {
      return userApiResponse(res, 401, false, "All fields are equierd!");
    }

    const userAlreadyExitsByEmail = await UserModel.findOne({ email });

    if (userAlreadyExitsByEmail) {
      return userApiResponse(res, 409, false, "User alredy exits with this email");
    }

    const userAlreadyExitsByUsername = await UserModel.findOne({ username });

    if (userAlreadyExitsByUsername) {
      return userApiResponse(res, 409, false, "User alredy exits with this username");
    }

    const hashPass = await bycrpt.hash(password, 10);

    const user = await UserModel.create({
      name,
      username,
      email,
      password: hashPass,
    });

    generateToken(user, 201, res);
  } catch (error) {
    return userApiResponse(
      res,
      401,
      false,
      `Error while registering user! => ${error}`
    );
  }
});

//User Login
exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { loginIdentifier, password } = req.body;
  try {
    if (!loginIdentifier || !password) {
      return userApiResponse(res, 401, false, "All fields are equierd!");
    }
    // const user = await UserModel.findOne({ email });

    const user = await UserModel.findOne({
      $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
    });

    const comparePassword = await bycrpt.compare(password, user.password);

    if (!comparePassword) {
      if (!user) {
        return userApiResponse(res, 401, false, "Invalid email or password");
      }
    } else {
      generateToken(user, 201, res);
    }
  } catch (error) {
    return userApiResponse(res, 401, false, `Error while logging! => ${error}`);
  }
});

//User Logout
exports.userLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires : new Date(Date.now()),
    httpOnly: true
  })
  return userApiResponse(res, 200, true, "user logged out successfully!");
});

// Check for user token present in cookie or not

exports.getUserProfile = catchAsyncError(async (req, res) => {
    try {
      return userApiResponse(res, 200, true, "User is Authenticated", req.user);
    } catch (error) {
      return userApiResponse(res, 401, false, "Error while getting user data");
    }
})

