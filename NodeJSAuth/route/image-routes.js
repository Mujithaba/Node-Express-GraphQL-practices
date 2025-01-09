const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isAdminUser = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { imageUploadController, fetchImagesController } = require("../controller/image-Controller");

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

router.get('/get',authMiddleware,fetchImagesController)

module.exports = router;
