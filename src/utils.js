const fs = require('fs');
const path = require('path');

const modFolder = 'http://localhost:3000/modules/';
const relToSrc = '../public/modules/';
// should be the absolute path to the working directory
const normDir = __dirname.replace(/[\\]/g,'/') + '/'; // fixes Window's backslash fetish

const getContent = function(modPath, subPath) {

    // console.log(modPath);
    // console.log(normDir);
    var modsHtml = '<ul>';
    var catHtml = '<ul>';
    var bookHtml = '<ul>';

    var mods = [];
    var cats = [];
    var books = [];

    var files = fs.readdirSync(normDir +'/' + modPath, {withFileTypes: true }).filter((dirent) => {
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

    
    catHtml += getFiles(cats,'', subPath);
    catHtml += '</ul>';

    bookHtml += getFiles(books,'.ibooks',subPath);
    bookHtml += '</ul>';

    retObj = {
        col1: catHtml,
        col2: modsHtml,
        col3: bookHtml
    }
    return retObj;
};

function getFiles(directory, entryPoint, subPath) {
    let out = '';   

    if (entryPoint === 'index.html') {
        directory.forEach((file) => {
            var outPath;
             if (subPath !== '') {
                 outPath = modFolder + subPath + path.posix.basename(file);
             } else {
                 outPath = modFolder + path.posix.basename(file);
             }
            // console.log(outPath);
            outPath = outPath.replace(/\s/g,'%20');
            out += `<li><a href="${outPath}/${entryPoint}">${path.posix.basename(file)}</a></li>`;                
        });
    } else if (entryPoint === '.ibooks') {
        directory.forEach((file) => {
            var outPath;
            if (subPath !== '') {
                outPath = modFolder + subPath + path.posix.basename(file)
            } else {
                outPath = modFolder + path.posix.basename(file);
            }
           out +=  `<li><a href="${outPath}.ibooks" download>${path.posix.basename(file)}</a></li>`;
        });
    } else {
        directory.forEach((file) => {
            if (subPath !== '') {
                out += `<li><a href="/picker?folder=${subPath}/${file}/">${file}</a></li> `;
            } else {
                out += `<li><a href="/picker?folder=${file}">${file}</a></li> `;
            }
            
        });
    }
    
    return out;
}

module.exports = {
    getContent
}