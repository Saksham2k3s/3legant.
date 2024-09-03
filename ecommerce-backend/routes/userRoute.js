const express = require('express');
const { userRegister, userLogin, userLogout, getUserProfile, addProductIntoCart } = require('../controllers/AuthController');
const { isAuthenticatedUser } = require('../middlewares/auth');


const userRoute = express.Router();

userRoute.route('/register').post(userRegister);
userRoute.route('/login').post(userLogin);
userRoute.route('/profile').get( isAuthenticatedUser ,getUserProfile);
userRoute.route('/logout').get(userLogout);


module.exports = userRoute;