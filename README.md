# utterance

Search YouTube videos for specific phrases uttered.

The user provides two parameters: "Search" and "Phrase". Search is the standard query provided to YouTube which provides, in order, the next top 10 results at a time. The phrase parameter is then used to filter these results so that only videos with captions containing this phrase are returned. If an empty (null) phrase is provided then the top 10 results are simply returned.


### Todo:

Frontend:
[x] Search bars for video and phrase parameters
[x] Embedded YouTube video element
[ ] List all results found in sidebar
[ ] Load more matches button

  Backend:
[x] Generic YouTube video search
[x] Search video captions for specific phrases
[ ] Support longer phrases which are spread over multiple timestamps
[ ] Cache timestamped results in a database
