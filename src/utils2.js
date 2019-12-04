/* this file is not in use in production. The developer was attempting to make the site more 'asynchronous'

    The idea here is to attempt to front-load all the directory and module information into a client-
    side Javascript object so that the page will not have to reload every time a category is selected. By 
    doing this the content on the page itself could update dynamically without needing to communicate with the 
    server.

*/
const fs = require('fs');
const path = require('path');

const modFolder = '/modules/';

// data will be loaded to the page via the script below
// the backslashes are for multiline string definitions
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