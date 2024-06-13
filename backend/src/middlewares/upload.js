const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/quotationPDF");
  },
  filename: (req, file, cb) => {
    const filename = `${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}.${file.mimetype.split("/")[1]}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

module.exports = upload;
