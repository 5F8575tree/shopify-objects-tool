const express = require('express');
const router = express.Router();
const { storefrontAxios } = require('../../config/axiosInstances');

// Endpoint for Storefront API GraphQL queries
router.get('/storefront/:query', async (req, res) => {
  // try {
  //   // Construct GraphQL query from request parameter
  //   const graphqlQuery = { query: decodeURIComponent(req.params.query) };

  //   const response = await storefrontAxios.post('', graphqlQuery);
  //   res.json(response.data);
  // } catch (error) {
  //   console.error('Error with Storefront API request:', error.response || error);
  //   res.status(500).send('Error with Storefront API request');
  // }
});

module.exports = router;
