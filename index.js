#!/usr/bin/env node
const https = require('https');
const aboutMeFilePath = "https://raw.githubusercontent.com/shajanjp/shajanjp/master/shajanjp.json"

function getLatestAboutMe(filePath){
  let aboutMe = {
    "name": "Shajan Jacob",
    "email": "shajanjp@gmail.com",
    "website": "https://shajanjacob.com",
    "job": "Senior Software Engineer",
    "github": "https://github.com/shajanjp",
    "twitter": "https://twitter.com/shajanjacob",
    "linkedin": "https://www.linkedin.com/in/shajanjp"
  };
  
  return new Promise((resolve, reject) => {
    https.get(filePath, function(res){
      let body = '';
      
      res.on('data', function(chunk){
        body += chunk;
      });
      
      res.on('end', function(){
        aboutMe = JSON.parse(body);
        
        resolve(aboutMe);
      });
    }).on('error', function(e){
      resolve(aboutMe);
    });
  });
}

getLatestAboutMe(aboutMeFilePath)
.then(aboutMe => {
  console.log(aboutMe);
});
