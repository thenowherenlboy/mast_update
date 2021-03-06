// Main functionality file. This polls the Categories subdirectories for Adobe® Captivate modules 
// (The module name will be the name of the directory that contains the module.)

const fs = require('fs');
const path = require('path');

var modFolder = path.join(__dirname,'../modules/');
if (process.platform === 'win32') {
    modFolder = path.win32.normalize(modFolder);
} else {
    modFolder = path.normalize(modFolder);
}

// data will be loaded to the page via the script below
const htmlScript = '<script>\
  function getSubs() { \
    //alert("why do you suck? " + mod) \
    var title = document.getElementById("sumid").innerHTML; \
    var listItems = document.getElementsByTagName("a"); \
    var listItem; \
    listItems.forEach((element) => { \
        if (element.innerHTML === title) { \
            listItem = element; \
        } \
    }); \
    listItem.style.fontWeight = "800"; \
    listItem.style.color = "blue"; \
}\
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
               console.log(modPath);
               console.log(modFolder);
               mods.push(dirent.name);
           } else if (modPath !== modFolder) {
               cats.push(dirent.name);
           }
        } else if ((path.extname(dirent.name)) === '.ibooks') {
            var name = path.basename(dirent.name, '.ibooks');
            books.push(name);
        }
    });

    modsHtml += getFiles(mods,'index.html', subPath); 
    modsHtml += '</ul><script>getSubs();</script>';

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
            if (outPath.charAt(0) === '.') {
                outPath = outPath.substr(1, (outPath.length - 1));
            }
            out +=  `<li><a href="${outPath}/${entryPoint}">${path.posix.basename(file)}</a></li>`; 
        } else if (entryPoint === '.ibooks') {
            outPath += subPath + path.posix.basename(file);
            out +=   `<li><a href="${outPath}.ibooks" download>${path.posix.basename(file)}</a></li>`;
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
           out += `<li><a href="/picker?folder=${file.name}">${file.name}</a></li>`
        }
    });
    //out += '<li><a href="/picker" onclick="getSubs(\'Module Selector\');">&larr;Module Home</a></li>'
    out += '</ul>'
    return out;
}

module.exports = {
    getContent
}