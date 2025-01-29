const { wishlistApiResponse } = require("../utils/responseUtils");
const catchAsyncError = require("../middlewares/catchAsyncError");
const wishListModel = require("../models/wishListModel");
const { default: mongoose } = require("mongoose");

// Add and remove product from wishlist
exports.wishlist = catchAsyncError(async (req, res) => {
  const userId = req.user.id;
  const productId = new mongoose.Types.ObjectId(req.params.id);

  try {
    let wishlist = await wishListModel.findOne({ userId });

    if (!wishlist) {
      await wishListModel.create({ userId: new mongoose.Types.ObjectId(userId), items: [productId] });
      return wishlistApiResponse(res, 200, true, "Product added to wishlist");
    }

    const productIndex = wishlist.items.findIndex((item) => item.equals(productId));

    if (productIndex !== -1) {
      wishlist.items.splice(productIndex, 1);
      await wishlist.save();
      return wishlistApiResponse(res, 200, true, "Product removed from wishlist");
    }

    wishlist.items.push(productId);
    await wishlist.save();
    return wishlistApiResponse(res, 200, true, "Product added to wishlist");
  } catch (error) {
    console.error("Error handling wishlist:", error);
    return wishlistApiResponse(res, 500, false, "Server error");
  }
});

// Fetch wishlist
exports.getWishlist = catchAsyncError(async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await wishListModel.findOne({ userId }).populate("items")
    if (!wishlist) {
      return res.status(500).json({
        message: "No wishlist found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Wishlist fetch sccuessfully!",
      success: true,
      items: wishlist.items,
    });
  } catch (error) {
    return wishlistApiResponse(res, 500, false, "Server error");
  }
});
