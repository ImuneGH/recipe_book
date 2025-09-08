import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const isDev = !app.isPackaged;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  try {
    const serverPath = path.join(__dirname, "backend", "server.js");
    const serverURL = pathToFileURL(serverPath).href;
    await import(serverURL);
    console.log("Server started! 👌");
  } catch (err) {
    console.log("Server error: ", err);
  }
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, "dist", "index.html");
    mainWindow.loadFile(indexPath);
  }
}

// 1. Electron je připraven → otevři okno
app.whenReady().then(async () => {
  await startServer();
  createWindow();
});

// 2. Všechna okna zavřená → ukonči (kromě macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 3. macOS: klik na dock ikonu → otevři okno (pokud žádné není)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
