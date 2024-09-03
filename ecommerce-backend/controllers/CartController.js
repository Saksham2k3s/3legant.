const catchAsyncError = require("../middlewares/catchAsyncError");
const UserModel = require("../models/userModel");
const productModel = require("../models/productModel");
const { userApiResponse, cartApiResponse } = require("../utils/responseUtils");
const userModel = require("../models/userModel");
const cartModal = require("../models/cartModal");

// Get User Cart
exports.getUserCart = catchAsyncError(async (req, res) => {
  const userId = req.user.id;
  try {
    // Find the user's cart
    const cartmodal = await cartModal.findOne({ user: userId });
    const cart = cartmodal.products;

    if (!cart) {
      return cartApiResponse(res, 404, false, "Cart not found");
    }

    // Prepare the cart data
    const cartData = await Promise.all(
      cart.map(async (item) => {
        return {
          product: await productModel.findById(item.product),
          quantity: item.quantity,
        };
      })
    );

    console.log("This is cart data", cartData);
    return cartApiResponse(
      res,
      200,
      true,
      "Hi, welcome to my cart!",
      cartData
    );
  } catch (error) {
    return cartApiResponse(res, 501, false, "Error while fetching cart data");
  }
});


// Add Product Into Cart
exports.addProductIntoCart = catchAsyncError(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return userApiResponse(res, 404, false, "Product not found");
    }

    // Find the user's cart or create a new one
    let cart = await cartModal.findOne({ user: userId });
    if (!cart) {
      cart = new cartModal({ user: userId, products: [] });
    }

    // Check if the product is already in the cart
    const cartItem = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity++; // Increase quantity if already exists
    } else {
      cart.products.push({ product: product._id, quantity: 1 }); // Add new product to cart
    }

    // Save the updated cart document
    await cart.save();

    return userApiResponse(
      res,
      200,
      true,
      "Product added to cart successfully"
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return userApiResponse(res, 500, false, "Error adding product to cart");
  }
});

// Remove product from cart
exports.removeProduct = catchAsyncError(async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    console.log("User id", userId);
    console.log("Product id", productId);
    // Find the user's cart
    const cart = await cartModal.findOne({ user: userId });
   console.log("cart", cart);
    // If cart not found, return immediately after sending the response
    if (!cart) {
      return cartApiResponse(res, 400, false, "Cart not found");
    }

    // Filter out the product from the cart
    const filteredCart = cart.products.filter((item) => {
      return item.product.toString() !== productId;
    });

    // Update the cart with the filtered products
    cart.products = filteredCart;

    // Save the updated cart
    await cart.save();

    return cartApiResponse(res, 200, true, "Product removed successfully!");
  } catch (error) {
    return cartApiResponse(
      res,
      400,
      false,
      "Error while removing product from cart."
    );
  }
});
