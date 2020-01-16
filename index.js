const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username",
    })
    // the function is using objDesctructoring as a parameter to only get back the "username" from the api request
    .then(function ({ username }) {
        const repoQuery = `https://api.github.com/users/${username}/repos?per_page=100`;
        const userQuery = `https://api.github.com/users/${username}`;
        const followerQuery = `https://api.github.com/users/${username}/followers`;

        axios.get(repoQuery).then(function (res) {

            // gets the number of stars for each repo
            const stars = res.data.map(repo => repo.stargazers_count);
            // condenses the array into a single total of stars
            const starsTotal = stars.reduce( (total, num) => total + num);
            // gets the names of all the repo's
            const repoNames = res.data.map( repo => repo.name);
            // joins all of the repos and creates a new line for each new repo
            const repoNamesStr = repoNames.join("\n");

            // writes the info to text file
            fs.writeFile("repos.txt", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }
                //message showing # of repos
                console.log(`saved ${repoNames.length} repos`)

            })
        });

        axios.get(userQuery).then(function (res) {

            const location = res.data.location;
            console.log(location);

            const picture = res.data.avatar_url;
            console.log(picture);

            const bio = res.data.bio;

            // const followerCount = res.data.
        })
    })
    // prompt({
    //     message: "Pick your favorite color",
    //     chosenColor:  "color"
    // })
    // .then(function ({ color }) {
    //     const useColor = color
    // })
