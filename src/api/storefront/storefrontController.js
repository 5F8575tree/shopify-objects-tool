// storefrontController.js
const { storefrontAxios } = require('../../config/axiosInstances');

// Function to fetch products
exports.fetchStorefrontProducts = async (req, res) => {
  try {
    const response = await storefrontAxios.post('', {
      query: `
        {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                description
              }
            }
          }
        }
      `,
    });

    const products = response.data.data.products.edges.map(edge => edge.node);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.fetchStorefrontCollections = async (req, res) => {
  try {
    const response = await storefrontAxios.post('', {
      query: `
        {
          collections(first: 10) {
            edges {
              node {
                id
                title
                handle
                description
              }
            }
          }
        }
      `,
    });

    const collections = response.data.data.collections.edges.map(edge => edge.node);
    res.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
