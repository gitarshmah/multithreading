// renderer.js
const { Worker } = require('worker_threads');

document.getElementById('calculateButton').addEventListener('click', async () => {
    const n = document.getElementById('numberInput').value;
    const result = await runWorker(n);
    document.getElementById('result').innerText = `Sum: ${result}`;
});

// Function to run the Web Worker
function runWorker(n) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: n });

        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', (error) => {
            reject(error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
