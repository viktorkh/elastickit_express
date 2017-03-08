var express = require('express');




var _orig_url = require('./orig_url');

var http = require('http');
  var session = require('express-session'),
  auth = require('./auth_dev');


var https = require('https');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var morgan = require('morgan');
var multer = require('multer');
var path    = require("path");
var app = express();

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'));
app.use(express.static('public'));



var genuuid = require('./genuuid');



var SearchkitExpress = require("searchkit-express");

//var server = http.createServer(app);




var browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server');

app.use(morgan('combined'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//app.use(multer({dest: './uploads'}));

app.use(session({
  genid: function (req) {
		  return genuuid() // use UUIDs for session IDs
  },
  resave: true,
  saveUninitialized: true,
  secret: "won't tell because it's secret"
}));
app.use(auth.initialize());
app.use(auth.session());

app.post('/login/callback', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {
    res.redirect('/');
  }
);

app.get('/login', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {
    res.redirect('/');
  }
);

//required to be after /login /post urls or else it will be endless redirects
app.use(auth.protected);

app.get('/', auth.protected, function (req, res){
	  //res.end("Hello " + req.session.passport.user);
     
      if(_orig_url.getUrl().length > 0)
      {
        res.redirect(_orig_url.getUrl());
      }  

     res.sendFile(path.join(__dirname+'/index.html'));
      
});

app.get('/tech', auth.protected, function (req, res){
	   res.sendFile(path.join(__dirname+'/tech.html'));
});

app.get('/sales', auth.protected, function (req, res){
	   res.sendFile(path.join(__dirname+'/sales.html'));
});
app.get('/sale/', auth.protected, function (req, res){
	   res.sendFile(path.join(__dirname+'/sales.html'));
});
/*
app.get('*', function(req, res){
  res.redirect('/');
});
*/

//app.listen(process.env.PORT || 3001);

var options = {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8'),
      phassphrase: '1234'
   };




var serverHttps= https.createServer(options, app);
serverHttps.listen(443);
app.listen(80);