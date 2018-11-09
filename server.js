// dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// get env vars
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect('mongodb://' + process.env.DBUSR + ':' + process.env.DBPWD + '@ds145043.mlab.com:45043/kia-telluride-launch', {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
});
/*
mongoose.connect('mongodb://' + process.env.DBUSR + ':' + process.env.DBPWD + '@ds135197-a0.mlab.com:35197,ds135197-a1.mlab.com:35197/jeep-wrangler-deg?replicaSet=rs-ds135197', {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
});
*/

// models
const admin = require('./server/models/admin');

// get routes
const userRoute = require('./server/routes/user');
const emailRoute = require('./server/routes/email');
const teamRoute = require('./server/routes/team');
const adminRoute = require('./server/routes/admin');
const employeeRoute = require('./server/routes/employee');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressSession({
  secret: process.env.AUTOMATIK_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(admin.authenticate()));
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());

// https redirect
app.all('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] == 'https' || req.hostname != '20telluride.com') {
    next();
  } else {
    console.log(req.protocol + process.env.PORT + '' + req.hostname + req.url);
    return res.redirect('https://' + req.get('host') + req.url);
  }
});

// API endpoints
app.use('/usr', userRoute);
app.use('/eml', emailRoute);
app.use('/tm', teamRoute);
app.use('/admn', adminRoute);
app.use('/emp', employeeRoute);

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve all other routes through index.html
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// get port from environment and store in Express
const port = process.env.PORT || '80';
app.set('port', port);

// create HTTP server
const server = http.createServer(app);

// listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost:${port}`));
