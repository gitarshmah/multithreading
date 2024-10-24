const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    win.loadFile('index.html');
}

ipcMain.handle('calculate-sum', async (event, n) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [path.join(__dirname, 'sum.py'), n]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString().trim());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
});

app.whenReady().then(createWindow);

