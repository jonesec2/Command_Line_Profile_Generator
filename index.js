const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username"
    })
    // the function is using objDesctructoring as a parameter to only get back the "username" from the api request
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        `https://api.github.com/users/jonesec2`

        axios.get(queryUrl).then(function (res) {
            // console.log(res)

            const stars = res.data.map(function (repo) {
                return repo.stargazers_count
            })
            console.log(stars)
            const starsTotal = stars.reduce((total, num) => total + num);
            console.log(starsTotal);

            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }

                console.log(`saved ${repoNames.length} repos`)

            })
        });
    })
