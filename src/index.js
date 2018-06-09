//call packages
const express = require('express');
const app = express();
const asyncHandler = require('./asyncHandler');
const rp = require('request-promise');

//set port
const port = process.env.PORT || 8000;

//prettify json output
app.set('json spaces', 2);

//middleware to use for searchnews
app.get('/searchnews', asyncHandler(async (req, res, next) => {
	
	//if no query parameter, search all stories
	if(req.query.query === undefined){
		req.query.query = '';
	}
	
	const topStoriesOptions = {
		uri: 'https://hacker-news.firebaseio.com/v0/topstories.json',
		json: true // Automatically parses the JSON string in the response
	};

	const results = []; //to store all the relevant title
	
	const topStories = await rp(topStoriesOptions);
	
	//iterate through each top story to find relevant title based on keyword /searchnews?query={keyword}
	await Promise.all(topStories.map(async id => {
		const itemOptions = {
			uri: 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json',
			json: true
		}
		
		//get the item details
		const story = await rp(itemOptions);
		
		//if title includes keyword, push to the results variable
		if(story.title.toLowerCase().includes(req.query.query)) {
			const result = {
							title: story.title,
							time: story.time,
							type: story.type,
							score: story.score,
							url: story.url
						   };
			results.push(result);
		}
	}));
	
	if(results.length === 0){
		res.status(404);
		res.send('Not Found');
	}
	
	//return all the search results
	res.json(results);
}));

//start the server
app.listen(port, () => console.log(`Listening at port ${port}`));