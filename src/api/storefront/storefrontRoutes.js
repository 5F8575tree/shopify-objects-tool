// storefrontRoutes.js
const express = require('express');
const router = express.Router();
const { fetchStorefrontProducts, fetchStorefrontCollections, performIntrospection, fetchShop } = require('./storefrontController');

// Setup a route to fetch products
router.get('/products', fetchStorefrontProducts);
router.get('/collections', fetchStorefrontCollections);
router.get('/shop', fetchShop);
router.get('/introspection', performIntrospection);

module.exports = router;
