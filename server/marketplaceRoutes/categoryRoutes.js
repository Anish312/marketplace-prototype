const express = require('express');
const {  authorizeRoles, isAuthenticatedUser } = require('../middleware/auth');
const { createProduct, getAllProducts, updateProduct, getProductById } = require('../marketplaceController/ProductController');
const { createCategory, getCategoryById, getAllCategories } = require('../marketplaceController/CategoryController');

const router = express.Router();

router.route("/category").post(  createCategory)
router.route("/categories").get(getAllCategories)
router.route("/category/:categoryId").get(getCategoryById)

module.exports = router;