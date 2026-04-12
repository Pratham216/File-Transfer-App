const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const archiver = require("archiver");
const cors = require("cors");
const os = require("os");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Ensure upload directory exists (Critical for Render/Cloud)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up storage for multer using absolute path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 * 1024 } });

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


// Helper to upload to Supabase
const uploadToSupabase = async (filePath, fileName, mimetype) => {
  const fileBuffer = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from("files")
    .upload(fileName, fileBuffer, {
      contentType: mimetype,
      upsert: true,
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from("files")
    .getPublicUrl(fileName);

  return publicUrl;
};

// Upload route
app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    if (req.files.length === 1) {
      const file = req.files[0];
      const publicUrl = await uploadToSupabase(file.path, file.filename, file.mimetype);
      
      // Clean up local file
      fs.unlinkSync(file.path);
      
      return res.json({ downloadUrl: publicUrl });
    }

    // Multiple files, create a ZIP
    const zipName = `files-${Date.now()}.zip`;
    const zipPath = path.join(__dirname, "uploads", zipName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", async () => {
      try {
        const publicUrl = await uploadToSupabase(zipPath, zipName, "application/zip");
        
        // Clean up all local files (original and zip)
        req.files.forEach(f => fs.unlinkSync(f.path));
        fs.unlinkSync(zipPath);
        
        res.json({ downloadUrl: publicUrl });
      } catch (err) {
        console.error("ZIP upload error:", err);
        res.status(500).json({ error: "Failed to upload ZIP" });
      }
    });

    archive.pipe(output);
    req.files.forEach((file) => {
      archive.file(file.path, { name: file.originalname });
    });
    archive.finalize();
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

// Serve uploaded files or zip
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const HOST = '0.0.0.0'; // Listen on all network interfaces
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Externally accessible at http://${localIp}:${PORT}`);
  console.log(`Base URL being used: ${BASE_URL}`);
});

server.timeout = 1800000; // 30 minutes
