'use strict';
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const router = require('./router.js');
// const app = express();
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/expressdemo');
//
// app.listen(3000, console.log('listen 3000'));
// app.use(bodyParser.json());
// app.use(router);
// app.use((err, req, res, next) => {
//     const errObj = {
//         message: err.message
//     };
//     for (let prop in err.errors) {
//         errObj[prop] = err.errors[prop].message;
//     }
//     res.status(500).send(errObj);
// });
//
// module.exports = app;


const cluster = require('cluster');

if (cluster.isMaster) {
    let numWorkers = require('os').cpus().length;

    console.log(`Master cluster setting up ${numWorkers} workers`);

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    for (let id in cluster.workers) {
        setTimeout(function () {
            if (cluster.workers[id]) {
                cluster.workers[id].kill('SIGKILL');
            }
        }, 10000)
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        cluster.fork();
    });
} else {
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const router = require('./router.js');
    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/expressdemo');

    app.listen(3000, console.log(`listen 3000 with process ${process.pid}`));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send(`process ${process.pid} says hello!`).end();
    });

    app.use(router);
    app.use((err, req, res, next) => {
        const errObj = {
            message: err.message
        };
        for (let prop in err.errors) {
            errObj[prop] = err.errors[prop].message;
        }
        res.status(500).send(errObj);
    });
}
