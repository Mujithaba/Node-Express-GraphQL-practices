const cloudinary = require("../config/cloudinary");

const uplaodToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error while uplaoding to cloudinary", error);
    throw new Error("Error while uplaoding to cloudinary");
  }
};

module.exports = {
  uplaodToCloudinary,
};
