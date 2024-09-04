const userModel = require("../models/userModel");
const { userApiResponse } = require("../utils/responseUtils");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')

 exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const{ token }= req.cookies;
    
    if(!token){
        return userApiResponse(res, 401, false, "Login first to access this resourse")
    }
    
    const decodedData = jwt.verify(token, process.env.JWT_SECERET);

    req.user = await userModel.findById(decodedData.id);

    next()

});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return userApiResponse(res, 401, false, "You don't have permissions to access this resource!");
        }
        next()
    }

   
}

