const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Create a simple upload path in your project root
const uploaderPathFolder = path.join(__dirname, '../upload');

// Create directory if it doesn't exist
if (!fs.existsSync(uploaderPathFolder)) {
    fs.mkdirSync(uploaderPathFolder, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploaderPathFolder)
    },
    filename: function(req, file, cb) {
        cb(null, 
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
});

const checkfileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('not an image, please try to upload only images.'))
    }
}

// multer middleware
module.exports = multer({
    storage: storage,
    fileFilter: checkfileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    }
});