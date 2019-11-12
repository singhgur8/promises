/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var plucky = require('./callbackReview.js');
var gitProfile = require('./promisification.js');
var write = Promise.promisify(fs.writeFile);

var fn = Promise.promisify(plucky.pluckFirstLineFromFile);
var fn2 = Promise.promisify(gitProfile.getGitHubProfileAsync);


var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO
  // console.log(plucky);
  // console.log(gitProfile);
  return fn(readFilePath)
    .then(function(name) {
      return fn2(name);
    })
    .then(function (profile) {
      return write(writeFilePath, JSON.stringify(profile));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
