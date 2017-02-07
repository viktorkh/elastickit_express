var express = require('express');






var http = require('http');
  var session = require('express-session'),
  auth = require('./auth');


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
     
     res.sendFile(path.join(__dirname+'/index.html'));
      
});

app.get('/hello', auth.protected, function (req, res){
	  res.end("Hello World!");
});
/*
app.get('*', function(req, res){
  res.redirect('/');
});
*/

app.listen(process.env.PORT || 3001);

