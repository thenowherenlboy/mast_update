const fs = require('fs');
const path = require('path');

const modFolder = 'http://localhost:3000/modules/';
const normDir = __dirname.replace(/[\\]/g,'/') + '/';

const getContent = function(modPath) {

    console.log(modPath);
    console.log(normDir);
    var modsHtml = '<ul>';
    var catHtml = '<ul>';
    var bookHtml = '<ol>';

    var mods = [];
    var cats = [];
    var books = [];

    var files = fs.readdirSync(normDir +'/' + modPath);
    console.log(normDir);
    console.log(files);

    // reject directories that do not have an index.html entry point
   
    files.forEach((file) =>{
        var isItThere = normDir + modPath + file + '/index.html';
        console.log(normDir + modPath + file);

        if (fs.existsSync(isItThere)) {
            pushIt(mods,file);
        } else if(path.extname(file) === '.ibooks') {
            var pushed = path.basename(file,'.ibooks');
            pushIt(books,pushed);
        } else if (path.dirname(file) === file) {
            pushIt(cats,file);
        }        
    });

    function pushIt(arr,file) {
        arr.push(file);
    }

    // when dealing with an http server, the developer must remember there are
    // "two" root directories, the actual project root (e.g. \Mast_update\) and the
    // client facing root (\Mast_upadate\public\) from where assets are consumed
    // by the client browser. When requiring files for the client from the web
    // browser remember that the client automatically defaults to the ..\public\
    // directory

    modsHtml += getFiles(mods,'index.html'); 
    modsHtml += '</ul>';

    
    catHtml += getFiles(cats,'');
    catHtml += '</ul>';

    bookHtml += getFiles(books,'.ibooks');
    bookHtml += '</ol>';

    retObj = {
        col1: catHtml,
        col2: modsHtml,
        col3: bookHtml
    }
    return retObj;
};

function getFiles(directory, entryPoint) {
    let out = '';   

    if (entryPoint === 'index.html') {
        directory.forEach((file) => {
            var outPath = modFolder + path.posix.basename(file);
            // console.log(outPath);
            outPath = outPath.replace(/\s/g,'%20');
            // console.log(outPath);
            out += `<li><a href="${outPath}/${entryPoint}">${path.posix.basename(file)}</a></li>`;                
        });
    } else if (entryPoint === '.ibooks') {
        directory.forEach((file) => {
            var outPath = modFolder + path.posix.basename(file);
           out +=  `<li><a href="${outPath}.ibooks" download>${path.posix.basename(file)}</a></li>`;
        });
    } else {
        // directory.forEach((file) => {
            out += `<li><a href="/picker?folder=Category1">Cat1</a></li> `;
        // })
    }
    
    return out;
}

module.exports = {
    getContent
}