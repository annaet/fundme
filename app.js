/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com

var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var bodyParser = require('body-parser');

// create a new express server
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.io = io;

// require
//require('./server/routes')(app);

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));

// static - all our js, css, images, etc go into the assets path
app.use('/app', express.static(__dirname + '/public/app'));
app.use('/bower_components', express.static(__dirname + '/public/bower_components'));
// app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.get('/*', function(req, res) {
  res.sendfile('./public/index.html');
});

app.use(bodyParser.json());

app.post('/thankyou', function(req, res){
  req.app.io.emit('typopup', {key: "value"} );
  res.end();
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
server.listen(appEnv.port, function() {

  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
