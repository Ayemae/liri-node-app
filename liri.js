require("dotenv").config();

var keys = require("key");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var requestInput = process.argv[2];
var requestSubject = process.argv[3];

function getTweets() {

}

function getSong() {

}

function getMovie() {

}

function getFromRandom() {

}

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