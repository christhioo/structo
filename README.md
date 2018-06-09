# Structo
A RESTful API to filter HackerNews (HN) top stories via keywords. HN top stories can be obtained by calling the following API:
```
https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
```

Get stories by `GET /searchnews?query={keyword}`

All the results from `/searchnews` will return like the following json format:
```
[
  {
     "title": "Show HN: Interactive guitar scales diagrams",
     "time": 1528544086,
     "type": "story",
     "score": 121,
     "url": "https://grunfy.com/scaler.html"
  },
  ...
]
```

Installation
------------
Install server dependencies
```
npm install
```

Running the App
---------------
From the project root directory run the following:
```
npm start
```

Running the Test Script
-----------------------
From the project root directory run the following:
```
npm test
```
