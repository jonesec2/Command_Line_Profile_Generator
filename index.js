const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
// const namer = require('color-namer')
// var names = namer(color, { pick: ['basic', 'x11'] })

// let test = names(red)
// console.log(test)



inquirer
    .prompt([ 
        {
            message: "Enter your GitHub username",
            name: "username"
        },
        {
            message: "Pick your favorite color",
            name: "color"
        }
    ])

    .then(function ({ username, color }) {
        const repoQuery = `https://api.github.com/users/${username}/repos?per_page=100`;
        const userQuery = `https://api.github.com/users/${username}`;
        console.log(`<div style='color:${color}'>hey<div>`)


        axios.get(userQuery).then(function (res) {

            const picture = res.data.avatar_url;
            const name = res.data.name;
            const location = res.data.location;
            const gitHub = res.data.html_url;
            const blog = res.data.blog;
            const bio = res.data.bio;
            const repoNumber = res.data.public_repos;
            const followers = res.data.followers;
            const following = res.data.following;
            console.log(picture)

            axios.get(repoQuery).then(function (res) {

                // gets the number of stars for each repo
                // condenses the array into a single total of stars
                const stars = res.data.map(repo => repo.stargazers_count);
                const starsTotal = stars.reduce((total, num) => total + num);

                // gets the names of all the repo's
                const repoNames = res.data.map(repo => repo.name);

                // joins all of the repos and creates a new line for each new repo
                const repoNamesStr = repoNames.join("\n");

                // writes the info to text file
                // fs.writeFile("repos.txt", repoNamesStr, function (err) {
                //     if (err) {
                //         throw err;
                //     }
                //     //message showing # of repos
                //     console.log(`saved ${repoNames.length} repos`);
                // })
            });

            //template literals into pdf go here
            const displayName = /*html*/ `${name}`
        })
    
    })