const ProductModel = require('../models/productModel');
const OrderModel = require('../models/orderModel');
const catchAsyncError = require('../middlewares/catchAsyncError');
const { orderApiResponse } = require('../utils/responseUtils');

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { contactInfo, shippingInfo, orderItems, paymentInfo, itemsPrice, totalPrice } = req.body

    const order = await OrderModel.create({
        contactInfo,
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        totalPrice,
        user : req.user._id,
        paidAt : Date.now()  
    });

    return orderApiResponse(res, 201, true, "Order successfully");
})