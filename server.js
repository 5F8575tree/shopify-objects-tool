require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Configure Axios for Shopify API
const shopifyAxios = axios.create({
  baseURL: process.env.SHOPIFY_STORE_URL,
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY
  }
});

// Function to construct Shopify API endpoint
function getShopifyEndpoint(type) {
  const endpoints = {
    'products': '/admin/api/2024-01/products.json',
    'collections': '/admin/api/2024-01/custom_collections.json',
  };

  return endpoints[type] || null;
}

// Route to fetch data dynamically
app.get('/shopify/:type', async (req, res) => {
  console.log("Requested type:", req.params.type); // Log the requested type
  const endpoint = getShopifyEndpoint(req.params.type);
  console.log("Endpoint:", endpoint);

  if (!endpoint) {
    return res.status(400).send('Invalid data type requested');
  }

  try {
    const response = await shopifyAxios.get(endpoint);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Shopify:', error.response || error);
    res.status(500).send('Error fetching data from Shopify');
  }
});

// not-yet-working connections
app.get('/shopify/collections/:collectionId', async (req, res) => {
  const collectionId = req.params.collectionId;
  try {
    // Your logic to fetch data from Shopify using the collectionId
    // For example, using the shopifyAxios instance:
    const response = await shopifyAxios.get(`/admin/api/2024-01/custom_collections/${collectionId}.json`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching collection data:', error);
    res.status(500).send('Error fetching collection data');
  }
});


app.get('/shopify/collections/:collectionId/products', async (req, res) => {
  console.log("Collection Products Route Hit");
  const collectionId = req.params.collectionId;
  const endpoint = `/admin/api/2024-01/custom_collections/${collectionId}/products.json`;

  try {
    const response = await shopifyAxios.get(endpoint);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products from collection:', error.response || error);
    res.status(500).send('Error fetching products from collection');
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
