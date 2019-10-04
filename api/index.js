const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const server = http.createServer(app);

app.set('port', process.env.PORT || 4000);

app.get('/', function(req, res) {
  res.send("");
});

const port = app.get('port');
server.listen(port, function(){
  console.log(`Api running on port ${port}...`)
});
