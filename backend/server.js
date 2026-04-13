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
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const FILE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

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
const BASE_URL = `http://${localIp}:${PORT}`;
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
console.log("Detected Local IP: ", localIp);
console.log("Base URL: ", BASE_URL);

const fileExists = async (filePath) => {
  try {
    await fsPromises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const scheduleFileDeletion = (filePath, delayMs = FILE_EXPIRY_MS) => {
  setTimeout(async () => {
    try {
      if (await fileExists(filePath)) {
        await fsPromises.unlink(filePath);
        console.log(`Deleted expired file: ${filePath}`);
      }
    } catch (error) {
      console.error(`Failed deleting expired file ${filePath}:`, error.message);
    }
  }, delayMs);
};

const deleteExpiredFiles = async () => {
  try {
    const files = await fsPromises.readdir(uploadsDir);
    const now = Date.now();

    await Promise.all(
      files.map(async (name) => {
        const filePath = path.join(uploadsDir, name);
        const stats = await fsPromises.stat(filePath);

        if (stats.isFile() && now - stats.mtimeMs >= FILE_EXPIRY_MS) {
          await fsPromises.unlink(filePath);
          console.log(`Deleted stale file: ${filePath}`);
        }
      })
    );
  } catch (error) {
    console.error("Error during expired file cleanup:", error.message);
  }
};

const getBaseUrl = (req) => {
  if (PUBLIC_BASE_URL) {
    return PUBLIC_BASE_URL.replace(/\/+$/, "");
  }

  const forwardedProto = req.headers["x-forwarded-proto"];
  const forwardedHost = req.headers["x-forwarded-host"];

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return BASE_URL;
};

// Upload route
app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    if (req.files.length === 1) {
      const file = req.files[0];
      const baseUrl = getBaseUrl(req);
      scheduleFileDeletion(file.path);
      return res.json({ downloadUrl: `${baseUrl}/uploads/${file.filename}` });
    }

    // Multiple files, create a ZIP
    const zipName = `files-${Date.now()}.zip`;
    const zipPath = path.join(__dirname, "uploads", zipName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", async () => {
      try {
        // Clean up all original files; keep zip available for download.
        await Promise.all(req.files.map((f) => fsPromises.unlink(f.path)));
        scheduleFileDeletion(zipPath);

        const baseUrl = getBaseUrl(req);
        res.json({ downloadUrl: `${baseUrl}/uploads/${zipName}` });
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
app.get("/health", (req, res) => res.json({ status: "ok" }));

const HOST = '0.0.0.0'; // Listen on all network interfaces
const server = app.listen(PORT, HOST, () => {
  deleteExpiredFiles();
  setInterval(deleteExpiredFiles, 5 * 60 * 1000);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Externally accessible at http://${localIp}:${PORT}`);
  console.log(`Base URL being used: ${BASE_URL}`);
  if (PUBLIC_BASE_URL) {
    console.log(`Public base URL override: ${PUBLIC_BASE_URL}`);
  }
});

server.timeout = 1800000; // 30 minutes
