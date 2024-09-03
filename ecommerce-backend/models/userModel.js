const mongoose = require('mongoose');
const validatior = require('validator');
const userSchema = new mongoose.Schema({
    name : {
     type: String,
     required: [true, "Please enter your name"]
    },
    username: {
        type: String,
        required : [true, "Please enter username"],
        unique : true
        
    },
    email: {
        type: String,
        required : [true, "Please enter your email"],
        unique : true
    },
    password : {
        type: String,
        required : [true, "Please enter the password"],
    },
    avatar : {
     publicId : {
       type : String,
     },
     url : {
        type : String
     }
    },
    role: {
        type: String,
        default : "user"
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products' // Reference to the Product model
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ]
})

module.exports = mongoose.model("User", userSchema)