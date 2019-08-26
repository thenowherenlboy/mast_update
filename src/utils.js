const fs = require('fs');
const path = require('path');

const modPath = '../public/modules/';

const getContent = function() {
    var dirs = __dirname;
    var notDirs = 'what the what and stuff, can i haz a cooky?'

    retObj = {
        col1: dirs,
        col2: notDirs,
        col3: '..no..'
    }
    return retObj;
};

module.exports = {
    getContent
}