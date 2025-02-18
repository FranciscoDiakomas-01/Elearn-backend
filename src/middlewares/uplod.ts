import path from "node:path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "elearn" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
});

export default upload;
