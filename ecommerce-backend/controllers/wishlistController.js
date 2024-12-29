const { wishlistApiResponse } = require("../utils/responseUtils");
const catchAsyncError = require("../middlewares/catchAsyncError");
const wishListModel = require("../models/wishListModel");

// Add to wishlist
exports.wishlist = catchAsyncError(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body;

  try {
    const wishlist = await wishListModel.findOne({ userId });

    // If user doing wishlist for very first time
    if (!wishlist) {
      wishlist = new wishListModel({
        userId: userId,
        items: [],
      });
    }

    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
    }

    return wishlistApiResponse(res, 200, true, "Product added to wishlist");
  } catch (error) {
    return wishlistApiResponse(res, 500, false, "Server error");
  }
});

// Remove product from wishlist

exports.RemoveFromWishlist = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const productId = req.params;
    
    try {
        const wishlist = await wishListModel.findOne({ userId });

        if(wishlist){
            wishlist.items = wishlist.items.filter((item) => item.toString() !== productId);
            await wishlist.save();
        }

        return wishlistApiResponse(res, 200, true, "Product removed to wishlist");
    } catch (error) {
        return wishlistApiResponse(res, 500, false, "Server error");
    }
});

// Fetch wishlist

exports.getWishlist = catchAsyncError(async (res, req) => {
    const userId = req.user.id;

    try {
        const wishlist = await wishListModel.findOne({ userId }).populate('items');

        if(!wishlist){
            return res.status(500).json({
                message : "No wishlist found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Wishlist fetch sccuessfully!",
            success : true,
            items : wishlist.items
        });

    } catch (error) {
        return wishlistApiResponse(res, 500, false, "Server error");
    }
})

