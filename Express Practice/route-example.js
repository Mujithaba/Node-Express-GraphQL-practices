const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Rounting Mahn");
});

app.get("/product", (req, res) => {
  const products = [
    { id: 1, name: "Safvan" },
    {
      id: 2,
      name: "Ajmal",
    },
    {
      id: 3,
      name: "Favaz",
    },
  ];

  res.json(products);
});

// dynamic routing

app.get("/product/:id", (req, res) => {
  const productId = Number(req.params.id);
  console.log("productId:", productId);
  const products = [
    { id: 1, name: "Safvan" },
    {
      id: 2,
      name: "Ajmal",
    },
    {
      id: 3,
      name: "Favaz",
    },
  ];

  const productData = products.find((product) => product.id === productId);
  console.log(productData,"prod");
  
  res.json(productData || { message: "Product not found" }); // Return product or error message
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
