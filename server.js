'use strict';

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var notes = './lib/notes/';
var counter = fs.readdirSync(notes).length;

app.use(bodyParser.json()); //parse console input into json

app.get('/', function(req, res) {
  fs.readFile(notes + '/' + req.params.file, function(err, data) {
    if(err) {
      res.status(500).send('Not found');
    } else {
      res.contentType(req.params.file);
      res.send(data);
    }
    res.end();
  })
});

app.get('/:num', function(req, res) {
  fs.readFile(notes + req.params.num + '.json', function(err, data) {
    if (err) {
      console.log(err);
      return res.send('This note does not exist.');
    };
    res.json({"message":data.toString()});
  });
});

app.post('/', function (req, res) {
  counter += 1;
  var path = notes + counter + '.json';
  fs.writeFile(path, JSON.stringify(req.body), function(err) {
    if (err) {
      console.log(err);
      return res.send('Error. Could not post this note.');
    }
    res.json({"message":"post successful"});
  });
});

app.put('/:num', function(req, res) {
  var path = notes + req.params.num + '.json';
  fs.readFile(path, function(err, data) {
    if (err) {
      console.log('PUT error: ' + err);
      return res.send('This note does not exist.');
    }
    fs.writeFile(path, JSON.stringify(req.body), function(err) {
      if (err) {
        console.log(err);
        return res.send('Error.  Could not put this note.');
      }
      res.json({"message":"success"});
    });
  });
});

app.delete('/:num', function(req, res) {
  var path = notes + req.params.num + '.json';
  fs.unlink(path, function(err) {
    if (err) {
      console.log(err);
      return res.send('There is no such post to delete');
    }
    res.json({"message":"success"});
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port ' + port);
});
