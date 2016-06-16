var electron = require('electron');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var save = require('./routes/save');

var eApp = electron.app;
var app = express();
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

//routing
app.set('port', (process.env.PORT || 3000));

app.use('/save', save);



//MongoDB stuff
var databaseURI = 'mongodb://apeloza:anthony@ds013004.mlab.com:13004/soloprojectsaves';
mongoose.connect(databaseURI);
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', databaseURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});

//server prep
app.listen(app.get('port'), function() {
  console.log("Server is ready on port:" + app.get('port'));
});
eApp.on('ready', function() {
  mainWindow = new BrowserWindow({
    height: 730,
    width: 1200
  });

  //open the window when ready
  mainWindow.loadURL(`file://${__dirname}/public/views/index.html`);
  mainWindow.webContents.openDevTools();

});
