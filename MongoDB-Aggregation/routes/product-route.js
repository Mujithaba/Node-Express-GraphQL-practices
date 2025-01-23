const express = require("express");
const {
  inserSampleProduct,
  getProductsStats,
  getProductAnalysis,
} = require("../Controllers/product-Controller");
const router = express.Router();

router.post("/add", inserSampleProduct);
router.get("/stats", getProductsStats);
router.get("/analysis", getProductAnalysis);

module.exports = router;
