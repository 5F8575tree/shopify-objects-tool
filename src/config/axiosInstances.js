const axios = require('axios');

console.log(process.env.SHOPIFY_STORE_URL);

// Configure Axios for Shopify Admin API
const shopifyAxios = axios.create({
  baseURL: process.env.SHOPIFY_STORE_URL,
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY
  }
});

// Configure Axios for Shopify Storefront API
const storefrontAxios = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_URL_SANS_HTTPS}/api/2024-01/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_API_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  }
});

module.exports = { shopifyAxios, storefrontAxios };
