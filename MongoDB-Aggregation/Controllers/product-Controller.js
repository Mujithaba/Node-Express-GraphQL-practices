const Product = require("../models/ProductSchema");

const inserSampleProduct = async (req, res) => {
  try {
    const sampleProducts = [
      {
        productName: "Nike Air Max 270",
        category: "Footwear",
        inStock: true,
        tags: ["footwear", "running", "sports"],
        price: 150,
      },
      {
        productName: "Adidas Ultraboost",
        category: "Footwear",
        inStock: true,
        tags: ["footwear", "sports", "comfort"],
        price: 80,
      },
      {
        productName: "Sony WH-1000XM5",
        category: "Electronics",
        inStock: false,
        tags: ["electronics", "headphones", "noise-canceling"],
        price: 350,
      },
      {
        productName: "Apple MacBook Pro 14",
        category: "Electronics",
        inStock: true,
        tags: ["electronics", "laptop", "apple"],
        price: 6000,
      },
      {
        productName: "The North Face Venture 2 Jacket",
        category: "Clothing",
        inStock: true,
        tags: ["clothing", "jacket", "outdoor"],
        price: 120,
      },
      {
        productName: "Samsung Galaxy S23 Ultra",
        category: "Electronics",
        inStock: false,
        tags: ["electronics", "smartphone", "samsung"],
        price: 200,
      },
      {
        productName: "Puma Running Shoes",
        category: "Footwear",
        inStock: true,
        tags: ["footwear", "running", "sports"],
        price: 100,
      },
      {
        productName: "Levi's 511 Slim Jeans",
        category: "Clothing",
        inStock: false,
        tags: ["clothing", "jeans", "casual"],
        price: 70,
      },
      {
        productName: "Canon EOS R5 Camera",
        category: "Electronics",
        inStock: false,
        tags: ["electronics", "camera", "photography"],
        price: 30,
      },
      {
        productName: "Asics Gel-Kayano 29",
        category: "Footwear",
        inStock: false,
        tags: ["footwear", "running", "stability"],
        price: 170,
      },
    ];

    const result = await Product.insertMany(sampleProducts);

    res.status(201).json({
      success: true,
      message: `Inserted ${result.length} sample products`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductsStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        // stage:1
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      {
        // stage 2 : grouping category ways
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevanue: {
            $sum: "$price",
          },
          maxproductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
          averageProductPrice: {
            $avg: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevanue: 1,
          maxproductPrice: 1,
          minProductPrice: 1,
          averageProductPrice: 1,
          priceRange: {
            $subtract: ["$maxproductPrice", "$minProductPrice"], // Correct spelling
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  inserSampleProduct,
  getProductsStats,
  getProductAnalysis,
};
