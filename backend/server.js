const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const cors = require("cors");
const os = require("os");
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

// Set local IP dynamically
const networkInterfaces = os.networkInterfaces();
let localIp = "localhost";
for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === "IPv4" && !iface.internal) {
      localIp = iface.address;
      break;
    }
  }
}

const PORT = process.env.PORT || 5000;
// Only use REACT_APP_NGROK_URL if it's an actual ngrok URL, otherwise use detected local IP
const envNgrok = process.env.REACT_APP_NGROK_URL;
const BASE_URL = (envNgrok && envNgrok.includes("ngrok")) 
  ? envNgrok 
  : `http://${localIp}:${PORT}`;
console.log("Detected Local IP: ", localIp);
console.log("Base URL: ", BASE_URL);


// Upload route
app.post("/upload", upload.array("files", 10), (req, res) => {
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

// Serve uploaded files or zip
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const HOST = '0.0.0.0'; // Listen on all network interfaces
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Externally accessible at http://${localIp}:${PORT}`);
  console.log(`Base URL being used: ${BASE_URL}`);
});
