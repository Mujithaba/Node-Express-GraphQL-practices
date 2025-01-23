const { uplaodToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require("../model/image");
const cloudinary = require("../config/cloudinary");
const imageUploadController = async (req, res) => {
  try {
    console.log("hio");

    //check if file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "file is required. Please upload an image",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uplaodToCloudinary(req.file.path);
    // store the image url and publicid along with the uploaded user id in databse
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image successfully uploaded",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong! Please try again",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {

    const page = req.query.page||1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;
    


    const sortedBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages/limit)

    const sortObj ={}
    
    sortObj[sortedBy]=sortOrder
    console.log(sortObj,"obj");
    const image = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (image) {
      res.status(200).json({
        success: true,
        currentPage:page,
        totalPages:totalPages,
        totalImages:totalImages,

        data: image,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong! Please try again",
    });
  }
};

// delete image who uploaded
const deleteImage = async (req, res) => {
  try {
    const getdeletedImageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getdeletedImageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: " image is not found",
      });
    }

    // check if this image is uploaded by the current user who is trying to delete this image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this image because haven't uploaded it",
      });
    }

    // delete this image from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    //dlete the data from data base
    await Image.findByIdAndDelete(getdeletedImageId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {
  imageUploadController,
  fetchImagesController,
  deleteImage,
};
