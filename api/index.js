const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { searchYouTube, searchCaptions } = require('./scrape');

app.use(cors());
app.set('port', process.env.PORT || 4000);

const MongoClient = require('mongodb').MongoClient;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

let cache;
const dbOpts = { useNewUrlParser: true, useUnifiedTopology: true };
MongoClient.connect(DB_URL, dbOpts, function (err, client) {
	if (err) { throw err }
	let db = client.db('utterance');
  cache = db.collection('cache');
});

const search = async (token, query, phrase) => {
  cache.findOne({ prevToken: token, query: query, phrase: phrase }, async (err, obj) => {
    if (err) {
      return { err: err };
    } else {
      if (obj == null) {
        const t = (token === "new") ? undefined : token;
        let searchResult;
        if (phrase) {
          searchResult = await searchCaptions(t, query, phrase);
        } else {
          searchResult = await searchYouTube(t, query);
        };
        cache.insertOne({
          prevToken: token,
          query: query,
          phrase: phrase,
          ...searchResult
        }, { safe: true });
        return searchResult;
      } else {
        return {
          items: obj.items,
          token: obj.token
        };
      };
    };
  });
};

app.get('/api/:token/:query', async function(req, res) {
  res.json(await search(req.params.token, req.params.query, ""));
});

app.get('/api/:token/:query/:phrase', async function(req, res) {
  res.json(await search(req.params.token, req.params.query, req.params.phrase));
});

const port = app.get('port');
server.listen(port, function(){
  console.log(`Api running on port ${port}...`)
});
