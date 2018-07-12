require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var requestInput = process.argv[2];
var requestSubject = process.argv.slice(3).join(" ");

function getTweets() {
    if (!requestSubject) {
        console.log("I didn't see a valid twitter screen name request.")
        var params = { screen_name: "dog_feelings", count: 20 }
    }
    else {
        var params = { screen_name: requestSubject, count: 20 };
    }
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(
                    tweets[i].created_at + "\n"
                    + tweets[i].text + "\n \n");
            }
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
        console.log("Track Title: " + data.tracks.items[0].name);
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("URL: " + data.tracks.items[0].external_urls.spotify);
    });
}

function getMovie() {
    if (!requestSubject) {
        var movie = "Isle of Dogs";
    }
    else {
        var movie = requestSubject;
    }
    var omdb = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(omdb, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            //  console.log(jsonData);
            console.log(
                "\nTitle: " + jsonData.Title,
                "\nYear: " + jsonData.Year,
                "\nRated: " + jsonData.Rated,
                "\nRotten Tomatoes: " + jsonData.Ratings[1].Value,
                "\nCountry: " + jsonData.Country,
                "\nLanguage: " + jsonData.Language,
                "\nCast: " + jsonData.Actors)
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
    fs.appendFile("search-history.txt", `${requestInput},${requestSubject}`, function(err) {
        if (err) throw err;
        console.log("This search has been logged to your search history.");
      });
}

runLiri();