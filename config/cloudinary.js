const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "docare",
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: function(req, file, cb) {
    // console.log("request =>", req);
    // console.log("file =>", file);
    cb(null, file.originalname);
    // The file on cloudinary would have the same name as the original file name
  }
});

const fileUploader = multer({ storage: storage }); // this function makes the upload process possible !!!!

module.exports = fileUploader;
