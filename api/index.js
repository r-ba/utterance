const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { searchYouTube } = require('./scrape');

app.set('port', process.env.PORT || 4000);

app.get('/api/:query/:phrase', function(req, res) {
  searchYouTube(req.params, function(results, error){
    if (!error) res.json(results);
    else res.json({
      error: error
    });
  });
});

const port = app.get('port');
server.listen(port, function(){
  console.log(`Api running on port ${port}...`)
});
