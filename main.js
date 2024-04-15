const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const os = require('os');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('btNative-clicked', (event, arg) => {
    createNewWindow(arg);
});

ipcMain.on('btBrowser-clicked', () => {
    const { shell } = require('electron');
    shell.openExternal('https://www.google.com');
});

ipcMain.on('get-os-info', (event) => {
    // let osType = os.type();
    // let message = "";
    
    event.reply('os-info', os.type());
});


function createNewWindow(text) {
    let newWindow = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    newWindow.loadURL(`data:text/html;charset=utf-8,<html><body><h1>${text}</h1></body></html>`);
}
