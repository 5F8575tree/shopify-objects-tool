// this file contains all the configuration incl.
// middleware setup and route definitions
const express = require('express');
const cors = require('cors');
const app = express();

// import routes
const adminRoutes = require('./api/admin/shopifyAdminRoutes');
const storefrontRoutes = require('./api/storefront/storefrontRoutes');

// middleware setup
app.use(cors({ origin: 'http://localhost:3000' }));

// define routes
app.use('/admin', adminRoutes);
app.use('/storefront', storefrontRoutes);

module.exports = app;
