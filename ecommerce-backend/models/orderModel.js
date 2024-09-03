const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  contactInfo : {
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    }
  },
  shippingInfo: {
    address: { 
        type: String,
         required: true
         },
    country: { 
        type: String,
         default: "India"
         },
    city: { 
        type: String,
         required: true 
        },
    state: { 
        type: String, 
        required: true 
    },
    
    pinCode: { 
        type: Number, 
        required: true 
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
   paymentType : {
    type : String,
    required : true,
    default : 'Credit Card'
   },
   
  },
  itemsPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
