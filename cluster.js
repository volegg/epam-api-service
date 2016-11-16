const cluster = require('cluster');

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', () => {
    cluster.fork()
  });
} else {
  require('./app.js');
}
