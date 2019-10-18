const fs = require('fs');
const path = require('path');

const modFolder = '/modules/';

// data will be loaded to the page via the script below
const htmlScript = '<script>\
    \
     </script>  ';

// should be the absolute path to the working directory
const normDir = __dirname.replace(/[\\]/g,'/') + '/'; // fixes Window's backslash fetish

const getContent = function(modPath, subPath) {

    var modsHtml =  '<ul>';
    var catHtml =  htmlScript + '';
    var bookHtml = '<ul>';

    var mods = [];
    var cats = [];
    var books = [];

    fs.readdirSync(modPath, {withFileTypes: true }).filter((dirent) => {
        // console.log(dirent.name);
        if(dirent.isDirectory()) {
           if(fs.existsSync(normDir + modPath + dirent.name + '/index.html')) {
               mods.push(dirent.name);
           } else {
               cats.push(dirent.name);
           }
        } else if ((path.extname(dirent.name)) === '.ibooks') {
            var name = path.basename(dirent.name, '.ibooks');
            books.push(name);
        }
    });

    // when dealing with an http server, the developer must remember there are
    // "two" root directories, the actual project root (e.g. \Mast_update\) and the
    // client facing root (\Mast_upadate\public\) from where assets are consumed
    // by the client browser. When requiring files for the client from the web
    // browser remember that the client automatically defaults to the ..\public\
    // directory

    modsHtml += getFiles(mods,'index.html', subPath); 
    modsHtml += '</ul>';

    catHtml += getCats('public/modules/'); 
    
    bookHtml += getFiles(books,'.ibooks',subPath);
    bookHtml += '</ul>';

    retObj = {
        col1: catHtml,
        col2: modsHtml,
        col3: bookHtml
    }
    return retObj;
};


function getFiles(directory, entryPoint, subPath) { // this help function populates the HTML for each of the output columns
    let out = '';  
    let outPath = ''; 

    directory.forEach((file) => {
        outPath = '';
        if(entryPoint === 'index.html') {
            outPath += modFolder + subPath + path.posix.basename(file);
            outPath = outPath.replace(/\s/g,'%20');
            out +=  `<li><a href="${outPath}/${entryPoint}">${path.posix.basename(file)}</a></li>`; 
        } else if (entryPoint === '.ibooks') {
            outPath += modFolder + subPath + path.posix.basename(file);
            out +=   `<li><a href="${outPath}.ibooks" download>${path.posix.basename(file)}</a></li>`;
        } else {
             out += `<li><a href="/picker?folder=${subPath}/${file}/">${file}</a></li> `;
        }
    });

    return out;
}

function getCats(pathTo) { // this function polls modules directory for modules and categories
    let out = '<ul>';
    var sumPath = '/' + path.basename(pathTo); // path.dirname(pathTo) +
    var folders = fs.readdirSync(sumPath, {withFileTypes: true});
        
    folders.forEach((file) => {
        if (file.isDirectory() && path.basename(pathTo) === 'modules' ) {
           out += `<li><a href="#" onclick="getSubs(\'${file.name}\')">${file.name}</a></li>`
        }
    });
    out += '<li><a href="#" onclick="getSubs(\'Module Selector\');">&larr;Module Home</a></li>'
    out += '</ul>'
    return out;
}

module.exports = {
    getContent
}