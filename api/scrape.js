const { google } = require('googleapis');
const youtube = google.youtube({version: 'v3', auth: process.env.YT_KEY});
const getSubtitles = require('youtube-captions-scraper').getSubtitles;

const reduceItems = (items) => {
  let result = {};
  for (let i in items) {
    if (items[i].id.kind == "youtube#video") {
      result[i] = {
        id: items[i].id.videoId,
        title: items[i].snippet.title,
        thumbnail: items[i].snippet.thumbnails.default,
        matches: []
      };
    };
  };
  return result;
};

const searchYouTube = async (token, query) => {
  const results = await youtube.search.list({
    'part': 'snippet',
    'type': 'video',
    'maxResults': '10',
    'q': query,
    'pageToken': token
  });
  return {
    items: reduceItems(results.data.items),
    token: results.data.nextPageToken
  };
};

const searchCaptions = async (token, query, phrase) => {
  let resultCount = 0;
  let results = {};
  let videos = await searchYouTube(token, query);
  let pageToken = videos.token;
  while (pageToken && resultCount == 0) {
    for (let i in videos.items) {
      let id = videos.items[i].id;
      try {
        let subs = await getSubtitles({ videoID: id });
        let matches = [];
        for (let caption of subs) {
          if (caption.text.toLowerCase().includes(phrase)) matches.push(caption);
        };
        if (matches.length) {
          results[resultCount++] = {
            id: id,
            title: videos.items[i].title,
            thumbnail: videos.items[i].thumbnail,
            matches: matches
          };
        };
      } catch (err) {}; // ignore items without captions
    };
    if (!resultCount) {
      videos = await searchYouTube(pageToken, query);
      pageToken = videos.token;
    };
  };
  return {
    items: results,
    token: pageToken
  };
};

module.exports = {
  searchYouTube: searchYouTube,
  searchCaptions: searchCaptions
};
