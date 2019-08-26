const fs = require('fs');
const path = require('path');

const modPath = '../public/modules/';

const getContent =  function() {
    var col1 = 'something\n';
    var col2 = '';
    var col3 = '';

    fs.readdirSync('U:\\Mast_update\\public\\modules', (err, files) => {
        if(err) {
            console.log(err.message);
            return;
        }
        files.forEach(file => {
            col1 += file + '\n';
            console.log(file);
        });
        console.log(col1);
    });

    retObj = {
        col1,
        col2,
        col3: '..no..'
    }
    return retObj;
};

module.exports = {
    getContent
}