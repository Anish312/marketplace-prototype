const express = require('express');
const {  authorizeRoles, isAuthenticatedUser } = require('../middleware/auth');
const { createProduct, getAllProducts, updateProduct, getProductById } = require('../marketplaceController/ProductController');

const router = express.Router();

router.route("/product").post(  createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").put(updateProduct)

router.route("/product/:productId").get(getProductById)

module.exports = router;