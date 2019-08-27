const fs = require('fs');
const path = require('path');


const modPath = '\\..\\public\\modules\\';

const getContent = function() {
    console.log(__dirname);
    console.log(__dirname + '\\' + modPath);
    var dirs = '<ul>';
    var notDirs = 'what the what and stuff, can i haz a cooky?';

    var files = fs.readdirSync(__dirname +'\\' + modPath);
    console.log(files);

    // reject directories that do not have an index.html entry point
   
    files.forEach((file) =>{
        var isItThere = __dirname + modPath + file + '\\index.html';
        console.log(isItThere);
        if(!fs.statSync(isItThere)) {
            files.slice(file);
        }
    });

    files.forEach((file)=> {
        var out = 'localhost:3000/modules/' + path.posix.basename(file);
        console.log(out);
        dirs += `<li><a href="http://${out}/index.html">${path.posix.basename(file)}</a></li>`;
    });
    dirs += '</ul>'
    // var html = new JSDOM(dirs);
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