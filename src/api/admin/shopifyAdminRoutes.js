const express = require('express');
const router = express.Router();
const { shopifyAxios } = require('../../config/axiosInstances');
const { getShopifyEndpoint } = require('../../utils/shopifyEndpoints');

router.get('/shopify/:type', async (req, res) => {
  console.log("Requested type:", req.params.type);
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

router.get('/shopify/collections/:collectionId', async (req, res) => {
  const collectionId = req.params.collectionId;
  try {
    const response = await shopifyAxios.get(`/admin/api/2024-01/collections/${collectionId}.json`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching collection data:', error);
    res.status(500).send('Error fetching collection data');
  }
});

router.get('/shopify/collections/:collectionId/products', async (req, res) => {
  const collectionId = req.params.collectionId;
  try {
    const response = await shopifyAxios.get(`/admin/api/2024-01/collections/${collectionId}/products.json`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching products for collection ${collectionId}:`, error);
    res.status(500).send(`Error fetching products for collection ${collectionId}`);
  }
});

module.exports = router;
