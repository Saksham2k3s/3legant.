const ProductModel = require("../models/productModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { productApiResponse } = require("../utils/responseUtils");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');
const CartModel = require('../models/cartModal')
//create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products-image",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
 
  // Convert colors and additional info into array
  req.body.colors = Array.isArray(req.body.colors) ? req.body.colors : req.body.colors.split(',');
  req.body.additionalInfos = JSON.parse(req.body.additionalInfos);

  try {
    const product = await ProductModel.create(req.body);
    return productApiResponse(res, 201, true, "Product Added successfully!", product);
  } catch (error) {
    return productApiResponse(
      res,
      400,
      false,
      "Error while adding product please try again later"
    );
  }
});


//Fetch all products
exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  try {
    const resultPerPage = 8;
    const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    const totalProducts = await ProductModel.countDocuments({});
    return productApiResponse(
      res,
      201,
      true,
      "Fetched Product Successfully!",
      products,
      totalProducts,
      resultPerPage
    );
  } catch (error) {
    return productApiResponse(
      res,
      400,
      false,
      "Error while fetching products!"
    );
  }
});

//Get Product Detail

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return productApiResponse(res, 500, false, "Product not found");
    }

    return productApiResponse(
      res,
      200,
      true,
      "Fetched Product Details Successfully",
      product
    );
  } catch (error) {
    return productApiResponse(
      res,
      400,
      false,
      "Error while fetching product details!"
    );
  }
});


// Update Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  let product = await ProductModel.findById(productId);

  if (!product) {
    return productApiResponse(res, 404, false, "Product not found");
  }

  let images = [];

  // Check if images are provided and handle appropriately
  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images;
    } else {
      return productApiResponse(res, 400, false, "Invalid images format");
    }
  } else {
    return productApiResponse(res, 400, false, "No images provided");
  }

  const imagesLinks = [];

  // Uploading images to Cloudinary
  try {
    for (let i = 0; i < images.length; i++) {
      let result;

      // Check if the image is a URL
      if (typeof images[i] === 'string' && images[i].startsWith('http')) {
        imagesLinks.push({ url: images[i], public_id: '' }); // If the image is a URL, public_id can be empty
      } else if (typeof images[i] === 'object' && images[i].url) {
        imagesLinks.push({ url: images[i].url, public_id: images[i].public_id || '' }); // Handle case with an object
      } else {
        // Assume it is a file path or base64 string
        result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products-image",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }
  } catch (error) {
    return productApiResponse(res, 500, false, "Error uploading images to Cloudinary", error.message);
  }

  req.body.images = imagesLinks;

  // Update product details in the database
  try {
    product = await ProductModel.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return productApiResponse(res, 404, false, "Product update failed");
    }

    return productApiResponse(res, 200, true, "Product Updated Successfully", product);
  } catch (error) {
    return productApiResponse(res, 500, false, "Error in updating product", error.message);
  }
});







// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return productApiResponse(res, 404, false, "Product not found");
    }

    // Delete the product
    await ProductModel.findByIdAndDelete(req.params.id);

    // Remove the product from all carts
    await CartModel.updateMany(
      {},
      { $pull: { products: { product: req.params.id } } }
    );

    return productApiResponse(res, 200, true, "Product Deleted Successfully and removed from all carts");
  } catch (error) {
    console.error("Error while deleting product:", error);
    return productApiResponse(res, 500, false, "Error while deleting product!");
  }
});

