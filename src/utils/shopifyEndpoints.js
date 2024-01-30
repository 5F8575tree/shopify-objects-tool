// Function to construct Shopify API endpoint
function getShopifyEndpoint(type) {
  const endpoints = {
    'products': '/admin/api/2024-01/products.json',
    'collections': '/admin/api/2024-01/smart_collections.json',
  };

  return endpoints[type] || null;
}

module.exports = { getShopifyEndpoint };
