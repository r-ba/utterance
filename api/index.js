const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { searchYouTube, searchCaptions } = require('./scrape');

app.use(cors());
app.set('port', process.env.PORT || 4000);

app.get('/api/:query', async function(req, res) {
  res.json(await searchYouTube(req.params.query));
});

app.get('/api/:query/:phrase', async function(req, res) {
  res.json(await searchCaptions(req.params));
});

const port = app.get('port');
server.listen(port, function(){
  console.log(`Api running on port ${port}...`)
});
