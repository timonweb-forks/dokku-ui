var config = require('./config');
var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser')
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.db_url);
var Models = require('./models')(Sequelize, sequelize);
sequelize.sync();

var app = express();

app.use(serveStatic('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {
      title: config.title
  });
});

app.get('/apps', function (req, res) {
    res.render('apps', {
      title: config.title + " - App"
  });
});

app.get('/databases', function (req, res) {
  res.render('databases', {
      title: config.title + " - Database"
  });
});

app.get('/createapp', function (req, res) {
  res.render('createapp', {
      title: config.title + " - Create New App"
  });
});

app.get('/creategroup', function (req, res) {
    res.render('creategroup', {
        title: config.title + " - Create New Group"
    });
});

app.get('/createdatabase', function(req, res){
	res.render('createdatabase', {
        title: config.title + " - Create New Database"
    });
});

app.get('/appinfo', function(req, res){
	res.render('appinfo', {
        title: config.title + " - App Information"
    });
});

app.get('/hello/:name', function (req, res) {
  res.send('Hello ' + req.params.name + '!');
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + listener.address().port);
});
