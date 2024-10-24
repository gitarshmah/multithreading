// worker.js
const { workerData, parentPort } = require('worker_threads');
const { spawn } = require('child_process');
const path = require('path');

// Path to the Python script
const pythonScriptPath = path.join(__dirname, 'app.py');

const pythonProcess = spawn('python3', [pythonScriptPath, workerData]);

pythonProcess.stdout.on('data', (data) => {
    const result = data.toString().trim();
    parentPort.postMessage(result);
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
    if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
    }
});
