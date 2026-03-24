const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Increased file size limit to 500MB to support larger files
const upload = multer({ 
  storage, 
  limits: { 
    fileSize: 500 * 1024 * 1024, // 500MB per file
    files: 10 // Maximum 10 files
  } 
});

// Get the Ngrok URL from environment variables or use IPv4 address
const ngrokUrl = process.env.REACT_APP_NGROK_URL || 'http://10.213.69.178:5000';
const BASE_URL = ngrokUrl;
console.log("Base URL: ", BASE_URL);


// Upload route with error handling
app.post("/upload", (req, res) => {
  upload.array("files", 10)(req, res, (err) => {
    // Handle multer errors
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ 
            error: 'File too large', 
            message: 'File size exceeds the maximum limit of 500MB' 
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ 
            error: 'Too many files', 
            message: 'Maximum 10 files allowed' 
          });
        }
        return res.status(400).json({ 
          error: 'Upload error', 
          message: err.message 
        });
      }
      return res.status(500).json({ 
        error: 'Server error', 
        message: err.message 
      });
    }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded', message: 'Please select at least one file' });
  }

  if (req.files.length === 1) {
    // Single file, return directly
    const fileUrl = `${BASE_URL}/uploads/${req.files[0].filename}`; // Updated download URL with BASE_URL
    return res.json({ downloadUrl: fileUrl });
  }

  // Multiple files, create a ZIP
  const zipFileName = `uploads/files-${Date.now()}.zip`;
  const zipPath = path.join(__dirname, zipFileName);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.on('error', (err) => {
    console.error('Archive error:', err);
    res.status(500).json({ error: 'Failed to create ZIP file', message: err.message });
  });

  output.on("close", () => {
    console.log(`ZIP file created: ${zipPath}`);
    const zipUrl = `${BASE_URL}/${zipFileName}`; // Updated ZIP file URL with BASE_URL
    res.json({ downloadUrl: zipUrl });
  });

  archive.pipe(output);

  req.files.forEach((file) => {
    archive.file(path.join(__dirname, "uploads", file.filename), { name: file.originalname });
  });

  archive.finalize();
  });
});

// Serve uploaded files or zip
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5000;
const HOST = '10.213.69.178'; // Your IPv4 address
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Base URL: ${BASE_URL}`);
});
