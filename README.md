# utterance
[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/r-ba/utterance/master/LICENSE)

*Search YouTube videos for specific phrases uttered*

Two search parameters are provided by the consumer, `searchTerm` and `searchPhrase`.
- `searchTerm` is used to query YouTube's data api for videos matching the string provided
- `searchPhrase` is then used to filter those results and return only the videos (along with their respective timestamps) of all the instances wherein the caption file contains matching substrings

Frontend built with:
- [React](https://reactjs.org/)
- [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference)

Backend built with:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [YouTube Data API](https://developers.google.com/youtube/v3/)
- [MongoDB](https://github.com/mongodb/node-mongodb-native)
