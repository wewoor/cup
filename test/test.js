const spawn = require('child_process').spawnSync;
const ls = spawn('node', ['../src/server.js']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.stderr.on("exit", (data) => {
    console.log("exit:", data);
})

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

process.exit();