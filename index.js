#!/usr/bin/env node
const https = require('https');
const aboutMeFilePath = "https://raw.githubusercontent.com/shajanjp/shajanjp/master/shajanjp.json"

function inColor(color = "green", text) {
  const colorMap = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
  };
  const reset = "\x1b[0m";
  
  return `${colorMap[color]}${text}${reset}`;
}

function keyValueInColor(key, value) {
  const keyValueCharStack = [];
  
  for (const char of key.split("")) {
    keyValueCharStack.push(inColor("green", char));
  }
  
  keyValueCharStack.push(`: "`);
  
  for (const char of value.split("")) {
    keyValueCharStack.push(inColor("yellow", char));
  }
  
  keyValueCharStack.push(`"`);
  
  return keyValueCharStack;
}

function typeTHis(data) {
  const charStack = [];
  
  charStack.push(inColor("green", "{\n"));
  
  for (const [key, value] of Object.entries(data)) {
    charStack.push("  ");
    charStack.push(...keyValueInColor(key, value));
    charStack.push("\n");
  }
  
  charStack.push(inColor("green", "}\n"));
  
  let index = 0;
  
  for (const char of charStack) {
    setTimeout(() => process.stdout.write(char), (index += 40));
  }
}

function getLatestAboutMe(filePath){
  let aboutMe = {
    "name": "Shajan Jacob",
    "website": "https://shajanjacob.com",
    "job": "Software Engineer",
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
  typeTHis(aboutMe);
});
