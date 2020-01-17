const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


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

        console.log(`<div style='background-color:${color}'>hey<div>`)


        axios.get(`https://api.github.com/users/${username}`).then(function (res) {

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
            console.log(location)

            axios.get(`https://api.github.com/users/${username}/repos?per_page=100`).then(function (res) {

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
            const displayName = /*html*/ `
            <h1>${name}</h1>
            <a href="https://www.google.com/maps/place/${location.split(' ').join(',%20')}"class='location fa-fal-icon'>${location}</a>
            `
            console.log(displayName)
        })
    
    })