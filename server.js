import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authenticate, authError } from './app/middleware';
import Config from './config';
const { port } = Config;
const fs = require('fs');
const app = express();
const { establishConnection } = require('./app/db');
const loadRoutes = require('./app/routes');
let isConnectionEstablished = false;

app
	.use(bodyParser.urlencoded({ useNewUrlParser: true }))
	.use(bodyParser.json())
	.use(cors());

app.use((req, res, next) => {
	// if (!isConnectionEstablished) {
	// 	res.status(200).json({status: false, error: 'connecting to db...'});
	// 	return;
	// }
  console.log('Time:', Date.now());
  next()
});

loadRoutes(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!')
});


// const http = require('http');
// const httpServer = http.createServer(app);
// httpServer.listen(9000, () => {
//   console.log(`App listening on port ${9000}!`);
// });


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.fundingtree.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.fundingtree.io/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.fundingtree.io/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const https = require('https');
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
  console.log(`App listening on port ${443}!`);
});
