const fs = require('fs');
const path = require('path');

const modFolder = '/modules/';

// data will be loaded to the page via the script below
const htmlScript = '<script>\
    \
     </script>  ';

// should be the absolute path to the working directory
const normDir = __dirname.replace(/[\\]/g,'/') + '/'; // fixes Window's backslash fetish

var modCol = [];
var catCol = [];
var bookCol = [];

fs.readdir(modFolder, {withFileTypes: true}, (err,results) => {
    if (err) { 
        console.log('Something went wrong: ' + err.message);
        return;
    }
    if (travSearch(results.name)) {
        modCol.push(results.name);
    } else {
        catCol.push(results.name);
    }
});

function travSearch(sumdir) {
    const files = fs.readdir(sumdir, {withFileTypes:true}, (err, res) => {
        if (err) { 
            console.log('Something is not right: ' + err.message);
            return;
        }
        return res;
    });
    files.forEach((file) => {
        if (file.name == 'index.html') {
            modCol.push(path.dirname(file));
        }
        if (file.extname == '.ibooks') {
            bookCol.push(file.name);
        }
    });
}