const { google } = require('googleapis');
const youtube = google.youtube({version: 'v3', auth: process.env.YT_KEY});

const searchYouTube = (q, cb) => {
  let params = {'part': 'snippet', 'type': 'video', 'maxResults': '50', 'q': q.query};
  youtube.search.list(params, function(error, response) {
		if (!error) {
      result = {
        items: response.data.items,
        nextToken: response.data.nextPageToken
      }
      cb(result, false);
		} else {
      cb(null, error);
    };
	});
};

exports.searchYouTube = searchYouTube;
