const fs = require('fs');
const path = require('path');

const normDir = __dirname.replace(/[\\]/g,'/') + '/'; // fixes Windows' backslash fetish

const baseDir = normDir + '/../public/modules/';

var moduleContents = [];
var iBookContents = [];

function setContents(directory) {
    fs.readdir(directory, {withFileTypes: true},(file) => {
        if(file.isDirectory()) {
           if(isModuleDirectory(file)) {
               moduleContents.push(directory.name)
           }
        }
    });
}

function isModuleDirectory(directory) {
  return fs.readdir(directory, {withFileTypes: true}, () => {
        fs.existsSync(baseDir + directory.name + '/index.html');
    });
}