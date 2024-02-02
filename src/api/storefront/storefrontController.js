// storefrontController.js
const { storefrontAxios } = require('../../config/axiosInstances');

// Function to fetch products
exports.fetchStorefrontProducts = async (req, res) => {
  try {
    const response = await storefrontAxios.post('', {
      query: `
        {
          products(first: 5) {
            edges {
              node {
                description
                handle
                id
                productType
                title
                featuredImage {
                  src
                }
              }
            }
          }
        }
      `,
    });

    const products = response.data.data.products.edges.map(edge => ({
      ...edge.node,
      id: edge.node.id.split('/').pop(),
      // Directly accessing the src from featuredImage
      image: edge.node.featuredImage ? edge.node.featuredImage.src : null,
    }));

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
                products(first: 10) {
                  edges {
                    node {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

  const collections = response.data.data.collections.edges.map(edge => ({
    ...edge.node,
    id: edge.node.id.split('/').pop(),
    products: edge.node.products.edges.map(productEdge => ({
      ...productEdge.node,
      id: productEdge.node.id.split('/').pop(),
    })),
  }));
    res.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.performIntrospection = async (req, res) => {
  try {
    const response = await storefrontAxios.post('', {
      query: `
        query IntrospectionQuery {
          __schema {
            types {
              name
              kind
              description
              fields(includeDeprecated: true) {
                name
                description
                type {
                  name
                  kind
                }
                args {
                  name
                  description
                  type {
                    name
                    kind
                  }
                  defaultValue
                }
              }
            }
          }
        }
      `,
    });

    // Assuming the response structure matches the query above
    const schemaInfo = response.data.data.__schema;
    res.json(schemaInfo);
  } catch (error) {
    console.error('Error performing introspection:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.fetchShop = async (req, res) => {
  try {
    const response = await storefrontAxios.post('', {
      query: `
        {
          shop {
            moneyFormat
            description
            id
            name
            shipsToCountries
            paymentSettings {
              acceptedCardBrands
              currencyCode
              supportedDigitalWallets
            }
          }
        }
      `,
    });

    if (!response.data || !response.data.data || !response.data.data.shop) {
      console.error('Unexpected response structure:', response.data);
      return res.status(500).json({ error: 'Unexpected response structure' });
    }

    // Destructure the shop object to extract the id and the rest of the shop fields
    const { id, ...rest } = response.data.data.shop;

    // Transform the id by splitting it and taking the last part
    const transformedId = id.split('/').pop();

    // Reconstruct the shop object with the transformed id
    const shop = {
      id: transformedId,
      ...rest
    };
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop in the storefront controller:', error);
    res.status(500).json({ error: 'Internal Server Error in Storefront Controller' });
  }
};
