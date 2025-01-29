const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { wishlist, getWishlist } = require('../controllers/wishlistController');


const wishlistRoute = express.Router();

wishlistRoute.route('/').get(isAuthenticatedUser, getWishlist);
wishlistRoute.route('/:id').patch(isAuthenticatedUser, wishlist);

module.exports = wishlistRoute;