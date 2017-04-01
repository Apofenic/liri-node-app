var request = require("request");
var fs = require("fs");
var keys =require('./keys.js');
var spotify = require('spotify');
var twitter = require('twitter');
var action = process.argv[2];
var nodeArgs = process.argv;
var movieValue
var value = "";
var client = new twitter (keys.twitterKeys);


for (var i = 3; i < nodeArgs.length; i++) {
	value = value + " " + nodeArgs[i];
};

function movieSearch() {
	value = value.trim();
    var movieValue = value.split(' ').join('+');
	var rotten = value.split(' ').join('_');

	request("http://www.omdbapi.com/?t=" + movieValue + "&y=c&plot=short&r=json", function(error, response, body) {

		if (!error && response.statusCode === 200) {
			console.log('');
			console.log(JSON.parse(body).Title);
			console.log('');
			console.log(JSON.parse(body).Year);
			console.log('');
			console.log(JSON.parse(body).imdbRating);
			console.log('');
			console.log(JSON.parse(body).Country);
			console.log('');
			console.log(JSON.parse(body).Language);
			console.log('');
			console.log(JSON.parse(body).Plot);
			console.log('');
			console.log(JSON.parse(body).Actors);
			console.log('');
			console.log(JSON.parse(body).Ratings[1].Source + " Score: " + JSON.parse(body).Ratings[1].Value);
			console.log('');
			console.log("https://www.rottentomatoes.com/m/"+ rotten);
			console.log('');	

 		};
	});
};

function songSearch() {
	value = value.trim()

	if (value === ''){
	    spotify.get('/v1/tracks/3DYVWvPh3kGwPasp7yjahc', function(err, data) {
       		if ( err ) {
       		  console.log('Error occurred: ' + err);
       		}else{
       		  console.log('');
       		  console.log(data.artists[0].name)
       		  console.log(data.name)
        	  console.log(data.preview_url)
        	  console.log(data.album.name)
        	};
      	});                 
	} else {
		spotify.search({ type: 'track', query: value }, function(err, data) {
		    
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    };
		 	console.log('');
		 	console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].album.name);
			console.log(data.tracks.items[0].album.artists[0].name);
			console.log(data.tracks.items[0].external_urls.spotify);
			console.log('');
		});
	};
};

function twitterSearch() {
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', function(error, tweets, response) {
	  if(error) throw error;
	  console.log('');
	  for(i=0;i<tweets.length;i++){

	  	console.log(tweets[i].text);
	  	console.log('');
	  };
	 	
	});
};

function fileSearch() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		value = data;
		songSearch();
	});
};

if(action == "my-tweets"){
	twitterSearch();
}
if(action == "spotify-this-song"){
	songSearch();
}
if(action == "movie-this"){
	movieSearch();
}
if(action == "do-what-it-says"){
	fileSearch();
}













