require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

// allow requests from the frontend server during development
app.use(cors({
  origin: 'http://localhost:3000' // frontend URL
}));

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
    'collections': '/admin/api/2024-01/smart_collections.json',
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

app.get('/shopify/collections/:collectionId', async (req, res) => {
  const collectionId = req.params.collectionId;
  try {
    const response = await shopifyAxios.get(`/admin/api/2024-01/custom_collections/${collectionId}.json`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching collection data:', error);
    res.status(500).send('Error fetching collection data');
  }
});

app.get('/shopify/collections/:collectionId/products', async (req, res) => {
  const collectionId = req.params.collectionId;
  try {
    // Fetch collects for the collection
    const collectsResponse = await shopifyAxios.get(`/admin/api/2024-01/collects.json?collection_id=${collectionId}&fields=id,product_id`);
    const productIds = collectsResponse.data.collects.map(collect => collect.product_id);

    // Fetch details for each product
    const productDetailsPromises = productIds.map(productId =>
      shopifyAxios.get(`/admin/api/2024-01/products/${productId}.json`)
    );
    const productsResponses = await Promise.all(productDetailsPromises);
    const products = productsResponses.map(response => response.data.product);


    res.json({ products });
  } catch (error) {
    console.error('Error fetching products from collection:', error);
    res.status(500).send('Error fetching products from collection');
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
