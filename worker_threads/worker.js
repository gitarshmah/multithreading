const { parentPort, workerData } = require('worker_threads');
const { spawn } = require('child_process');

const pythonProcess = spawn('python3', ['app.py']);

pythonProcess.stdin.write(workerData.toString());
pythonProcess.stdin.end();

pythonProcess.stdout.on('data', (data) => {
    parentPort.postMessage(data.toString().trim());
});

