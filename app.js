var express = require('express');
var app = express();
var db = require('./db');
var config = require('./config');
var morgan = require('morgan');
app.use(morgan('dev'));
app.set('superSecret', config.secret);
var PatientInfoController = require('./patientinfo/PatientInfoController');
var UserController=require('./patientinfo/UserController');
var RegisterController=require('./patientinfo/RegisterController');
app.use('/providers', PatientInfoController);
app.use('/authenticate',UserController);
app.use('/register',RegisterController);
// used wildecard route to serve my angular application. 
app.use(express.static(__dirname+'/app'));
app.get('/', function(req, res){
res.sendFile("index.html", {"root": __dirname+'/app'});
});
app.get('*', function(req, res){
    res.sendFile("index.html", {"root": __dirname+'/app'});
    });
module.exports = app;