const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { wishlist, RemoveFromWishlist, getWishlist } = require('../controllers/wishlistController');


const wishlistRoute = express.Router();

wishlistRoute.route('/').post(isAuthenticatedUser, wishlist);
wishlistRoute.route('/:id').delete(isAuthenticatedUser, RemoveFromWishlist);
wishlistRoute.route('/').get(isAuthenticatedUser, getWishlist);

module.exports = wishlistRoute;