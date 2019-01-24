var express = require('express');
var formidable = require('formidable');
var app = express();
var ut = require('./utils');

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
  });
var obj={};
    form.on('file', function (name, file){
       
         obj = ut.readJsonFile(file.path);
        ut.writeJsonFile(file.path);
        console.log('*****************Created seperate Object files**************** ');
        console.log(JSON.stringify(obj));

    });
    form.on('error', function(err) {
        res.send(err);
        res.end();
    })

    res.sendFile(__dirname + '/index.html');
    res.end("JSON files created..");
    
});

app.listen(8081);