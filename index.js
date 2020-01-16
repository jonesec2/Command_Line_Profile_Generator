const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username",
    })
    
    .then(function ({ username }) {
        const repoQuery = `https://api.github.com/users/${username}/repos?per_page=100`;
        const userQuery = `https://api.github.com/users/${username}`;

        axios.get(repoQuery).then(function (res) {

            // gets the number of stars for each repo
            // condenses the array into a single total of stars
            const stars = res.data.map(repo => repo.stargazers_count);
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
                console.log(`saved ${repoNames.length} repos`);
            })
        });

        axios.get(userQuery).then(function (res) {

            const repoNumber = res.data.public_repos;
            const location = res.data.location;
            const picture = res.data.avatar_url;
            const bio = res.data.bio;
            const name = res.data.name;
            const gitHub = res.data.html_url;
            const blog = res.data.blog;
            const followers = res.data.followers;
            const following = res.data.following;

        })
    })
    // prompt({
    //     message: "Pick your favorite color",
    //     chosenColor:  "color"
    // })
    // .then(function ({ color }) {
    //     const useColor = color
    // })
