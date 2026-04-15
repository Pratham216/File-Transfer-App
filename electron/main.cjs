const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow = null;
let backendProcess = null;

const isDev = !app.isPackaged;

function getBackendEntryPath() {
  if (isDev) {
    return path.join(app.getAppPath(), "backend", "server.js");
  }

  return path.join(process.resourcesPath, "backend", "server.js");
}

function getFrontendEntryPath() {
  return path.join(app.getAppPath(), "frontend", "dist", "index.html");
}

function startBackend() {
  if (isDev) {
    return;
  }

  const fs = require("fs");
  const backendEntry = getBackendEntryPath();
  const backendCwd = path.dirname(backendEntry);
  const uploadDir = path.join(app.getPath("userData"), "uploads");
  const logFilePath = path.join(app.getPath("userData"), "backend-log.txt");
  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

  const now = new Date().toISOString();
  logStream.write(`\n--- Starting Backend: ${now} ---\n`);
  logStream.write(`Backend Entry: ${backendEntry}\n`);
  logStream.write(`CWD: ${backendCwd}\n`);

  if (!fs.existsSync(backendEntry)) {
    logStream.write(`ERROR: Backend entry file not found!\n`);
    return;
  }

  backendProcess = spawn(process.execPath, [backendEntry], {
    cwd: backendCwd,
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: "1",
      PORT: "5000",
      UPLOAD_DIR: uploadDir
    },
    stdio: "pipe", // Capture output
    windowsHide: true
  });

  backendProcess.stdout.pipe(logStream);
  backendProcess.stderr.pipe(logStream);

  backendProcess.on("exit", (code, signal) => {
    const time = new Date().toISOString();
    logStream.write(`Backend process exited at ${time}. code=${code} signal=${signal || "none"}\n`);
  });

  backendProcess.on("error", (error) => {
    const time = new Date().toISOString();
    logStream.write(`Failed to start backend process at ${time}: ${error}\n`);
  });
}

function stopBackend() {
  if (backendProcess && !backendProcess.killed) {
    backendProcess.kill();
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 680,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devUrl = process.env.ELECTRON_START_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(getFrontendEntryPath());
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  stopBackend();
});
