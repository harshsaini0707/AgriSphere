const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../lib/cloudnairy");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'crop_images', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Invalid Image Type'), false);
      }
      cb(null, true);
    }
  });
  

module.exports = upload;
