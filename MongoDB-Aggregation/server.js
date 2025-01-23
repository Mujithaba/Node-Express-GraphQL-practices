require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product-route");
const bookRoute = require("./routes/book-route");
const app = express();

// connect db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb connected successfully"))
  .catch((e) => console.log(e));

//   use middleware
app.use(express.json());
app.use("/products", productRoute);
app.use("/reference", bookRoute);

//   server run
app.listen(process.env.PORT, () => {
  console.log(`server is running at port :${process.env.PORT}`);
});
