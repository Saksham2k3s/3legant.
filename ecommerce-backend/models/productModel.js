const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true
    },
    actualPrice : {
        type : Number,
        required : true
    },
    discountPrice : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    colors: [{ type: String }],
    additionalInfos: [{
      title: { type: String },
      content: { type: String },
      isVisible: { type: Boolean }
    }],
    measurements : {
        type : String,
    },

    user: {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true,
      },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Products', productSchema);
