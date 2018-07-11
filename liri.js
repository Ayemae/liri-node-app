require("dotenv").config();

var keys = require("key");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var requestInput = process.argv[2];
var requestSubject = process.argv[3];

switch (requestInput) {
    case "my-tweets":

    break;
    case "spotify-this-song":

    break;
    case "movie-this":

    break;
    case "do-what-it-says":

    break;
}