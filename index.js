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
        const repoQuery = `https://api.github.com/users/${username}/repos?per_page=100`;
        const userQuery = `https://api.github.com/users/jonesec2`

        axios.get(repoQuery).then(function (res) {
            // console.log(res.data[0])

            const stars = res.data.map(repo => repo.stargazers_count)
            // console.log(stars)
            const starsTotal = stars.reduce( (total, num) => total + num);
            console.log(starsTotal);

            const repoNames = res.data.map( repo => repo.name);
            console.log(repoNames)

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }

                console.log(`saved ${repoNames.length} repos`)

            })
        });

        axios.get(userQuery).then(function (res) {

            const location = res.data.location
            console.log(location)

            const picture = res.data.owner.avatar_url
            console.log(picture)
        })
    })
