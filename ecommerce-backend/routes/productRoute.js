const express = require("express");
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const productRoute = express.Router();

//public routes
productRoute.route("/all").get(getAllProduct);
productRoute.route("/:id").get(getProductDetails);

//Only admin can access these routes
productRoute
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
productRoute
  .route("/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
productRoute
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = productRoute;
