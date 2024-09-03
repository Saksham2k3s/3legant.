const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { addProductIntoCart, getUserCart, removeProduct } = require('../controllers/CartController');


const cartRoute = express.Router();

cartRoute.route('/:id').get( isAuthenticatedUser ,addProductIntoCart);
cartRoute.route('/').get(isAuthenticatedUser, getUserCart);
cartRoute.route('/:id').delete(isAuthenticatedUser, removeProduct);


module.exports = cartRoute;