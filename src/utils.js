const fs = require('fs');
const path = require('path');

const modFolder = 'modules/';

// data will be loaded to the page via the script below
const htmlScript = '<script>\
    \
     </script>  ';

// should be the absolute path to the working directory

const getContent = function(modPath, subPath) {
    //console.log(modPath);


    var modsHtml =  '<ul>';
    var catHtml =  htmlScript + '';
    var bookHtml = '<ul>';

    var mods = [];
    var cats = [];
    var books = [];

    fs.readdirSync(modPath, {withFileTypes: true }).filter((dirent) => {
        if(dirent.isDirectory()) {
           if(fs.existsSync(modPath + '/' + dirent.name + '/index.html')) {
               mods.push(dirent.name);
           } else {
               cats.push(dirent.name);
           }
        } else if ((path.extname(dirent.name)) === '.ibooks') {
            var name = path.basename(dirent.name, '.ibooks');
            books.push(name);
        }
    });

    modsHtml += getFiles(mods,'index.html', subPath); 
    modsHtml += '</ul>';

    catHtml += getCats(modFolder); 
    
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
            outPath += path.win32.normalize(subPath) + path.posix.basename(file);
            //console.log(outPath);
            //outPath = outPath.replace(/\s/g,'%20');
            out +=  `<li><a href="${outPath}/${entryPoint}">${path.posix.basename(file)}</a></li>`; 
        } else if (entryPoint === '.ibooks') {
            outPath += subPath + path.posix.basename(file);
            out +=   `<li><a href="${outPath}.ibooks" download>${path.posix.basename(file)}</a></li>`;
        } else {
             out += `<li><a href="/picker?folder=${subPath}/${file}/">${file}</a></li> `;
        }
    });

    return out;
}

function getCats(pathTo) { // this function polls modules directory for modules and categories
    let out = '<ul>';
    var sumPath = path.win32.normalize(pathTo);
    //console.log(sumPath);
    var folders = fs.readdirSync(sumPath, {withFileTypes: true});
        
    folders.forEach((file) => {
        if (file.isDirectory() && path.basename(pathTo) === 'modules' ) {
           out += `<li><a href="/picker?folder=${file.name}" onclick="getSubs(\'${file.name}\')">${file.name}</a></li>`
        }
    });
    out += '<li><a href="/picker" onclick="getSubs(\'Module Selector\');">&larr;Module Home</a></li>'
    out += '</ul>'
    return out;
}

module.exports = {
    getContent
}