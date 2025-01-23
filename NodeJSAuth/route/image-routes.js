const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isAdminUser = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  imageUploadController,
  fetchImagesController,
  deleteImage,
} = require("../controller/image-Controller");
const { route } = require("./route");

const router = express.Router();

//upload image
router.post(
  "/upload",
  authMiddleware,
  isAdminUser,
  uploadMiddleware.single("image"),
  imageUploadController
);

//to get all images
router.get("/get", authMiddleware, fetchImagesController);

// delete image
router.delete('/:id',authMiddleware,isAdminUser,deleteImage)
module.exports = router;
