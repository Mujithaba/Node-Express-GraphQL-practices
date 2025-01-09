const { uplaodToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require("../model/image");

const imageUploadController = async (req, res) => {
  try {console.log("hio");
  
    //check if file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "file is required. Please upload an image",
      });
    }

    //upload to cloudinary
    const {url,publicId}=await uplaodToCloudinary(req.file.path)
// store the image url and publicid along with the uploaded user id in databse
const newlyUploadedImage = new Image({
    url,
    publicId,
    uploadedBy:req.userInfo.userId
});

await newlyUploadedImage.save();

res.status(201).json({
    success:true,
    message:"Image successfully uploaded",
    image:newlyUploadedImage
})

} catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong! Please try again",
    });
  }
};

const fetchImagesController = async (req,res) =>{
  try {
    const image = await Image.find({})
if (image) {
  res.status(200).json({
    success:true,
    data:image
  })
}
  } catch (error) {
      console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong! Please try again",
    });
  } 
  }



module.exports ={
  imageUploadController,
  fetchImagesController
}