// storefrontRoutes.js
const express = require('express');
const router = express.Router();
const { fetchStorefrontProducts } = require('./storefrontController');

// Setup a route to fetch products
router.get('/products', fetchStorefrontProducts);

module.exports = router;
