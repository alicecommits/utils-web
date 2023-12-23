const multer  = require('multer')

// Set up storage for uploaded files
const UPLOAD_DIR = __dirname + "/uploadFiles"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
// Create the multer instance
const upload = multer({ storage: storage });

module.exports = {
  UPLOAD_DIR,
  upload
}