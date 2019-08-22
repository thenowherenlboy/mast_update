const fs = require('fs');

const getContent = function(url) {
    var body = fs.createReadStream(url);
    body.on('readable', function() {
        var result = '';
        var data;
        while (data = this.read()){
            //console.log(data.toString());
            result += data.toString();
        }
       // console.log(result);
        return result;
    });
}

module.exports = {
    getContent
}