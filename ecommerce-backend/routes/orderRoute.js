const express = require('express');
const { newOrder } = require('../controllers/orderController');



const orderRoute = express.Router();

orderRoute.route('/').post(newOrder)



module.exports = orderRoute;