const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// Get the Ngrok URL from environment variables
const ngrokUrl = process.env.REACT_APP_NGROK_URL; // Default fallback
console.log("Ngrok URL: ", ngrokUrl);


// Upload route
app.post("/upload", upload.array("files", 10), (req, res) => {
  if (req.files.length === 1) {
    // Single file, return directly
    const fileUrl = `${ngrokUrl}/uploads/${req.files[0].filename}`; // Updated download URL with ngrokUrl
    return res.json({ downloadUrl: fileUrl });
  }

  // Multiple files, create a ZIP
  const zipFileName = `uploads/files-${Date.now()}.zip`;
  const zipPath = path.join(__dirname, zipFileName);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(`ZIP file created: ${zipPath}`);
    const zipUrl = `${ngrokUrl}/${zipFileName}`; // Updated ZIP file URL with ngrokUrl
    res.json({ downloadUrl: zipUrl });
  });

  archive.pipe(output);

  req.files.forEach((file) => {
    archive.file(path.join(__dirname, "uploads", file.filename), { name: file.originalname });
  });

  archive.finalize();
});

// Serve uploaded files or zip
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${ngrokUrl}`);
});
