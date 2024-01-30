// storefrontRoutes.js
const express = require('express');
const router = express.Router();
const { fetchStorefrontProducts, fetchStorefrontCollections } = require('./storefrontController');

// Setup a route to fetch products
router.get('/products', fetchStorefrontProducts);
router.get('/collections', fetchStorefrontCollections);

module.exports = router;
