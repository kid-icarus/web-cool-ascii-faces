var express = require('express')
var app = express()
var http = require('http')
var cool = require('cool-ascii-faces')
var faces = require('cool-ascii-faces').faces

app.get('/', function(req, res) {
  res.send(cool() + "\n");
})

app.get('/api/v1/faces', function(req, res) {
  var payload = {
    "faces": faces.map(function(face, index, arr) {
      return { 'id': index, 'face': face }
    })
  }

  res.send(payload)
})

app.get('/api/v1/faces/:id', function(req, res) {
  if (req.params.id > faces.length) res.send(404, 'Woah, like totally no faces here!') 

  var payload = {"faces": [{
    "id": req.params.id,
    "face": faces[req.params.id]
  }]}

  res.send(payload)
})

app.listen('1337')
