import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploadPath = 'uploads/';
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    callback(null, uploadPath); // Specify the directory where files should be stored
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Use file.originalname instead of this.filename.originalname
  }
});

const upload = multer({ storage });

export default upload;