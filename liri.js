require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var requestInput = process.argv[2];
var requestSubject = process.argv[3];

function getTweets() {
    if (!requestSubject) {
        var params = { screen_name: "dog_feelings" }
    }
    else {
        var params = requestSubject;
    }
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    })
};

function getSong() {
    if (!requestSubject) {
        var songTitle = "The Dog Days are Over";
    }
    else {
        var songTitle = requestSubject;
    }
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

function getMovie() {
    if (!requestSubject) {
        var movie = "Isle of Dogs";
    }
    else {
        var movie = requestInput;
    }
    var omdb = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(omdb, function (error, response) {
        if (!error && response.statusCode == 200) {
            console.log(response.Title)
        }
    })
}

function getFromRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");

        requestInput = dataArr[0];
        requestSubject = dataArr[1];
        runLiri();
    });

}
function runLiri() {
    switch (requestInput) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            getSong();
            break;
        case "movie-this":
            getMovie();
            break;
        case "do-what-it-says":
            getFromRandom();
            break;
    }
}

runLiri();