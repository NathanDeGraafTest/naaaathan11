const skadi = require('skadi-hammerio');
const sequelize = require('./db/sequelize');
const express = require('express');
const routes = require('./routes');

// set our port
const port = process.env.PORT || 8080;

const app = express();

skadi.heartbeat();
skadi.osdata();

app.use((req, res, next) => {
  skadi.captureRequestData(req);
  next();
});

// routes
app.use('/', routes);

app.use((req, res, next) => {
  skadi.captureResponseData(req, res);
});

// start app at localhost:8080
app.listen(port);

console.log(`Listening on ${port}`);
module.exports = app;