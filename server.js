const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! This will be the Shopify API Integration Project.');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
