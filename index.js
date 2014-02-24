var writeFiles = require('./lib/writeFiles');
var path = require('path');
var fs = require('fs');
var tmpFile = '.tmp.gruntrc';

module.exports = function(data, type, target){
    if('string' === typeof data){
        fs.writeFileSync(tmpFile, 'module.exports='+data+';', {encoding:'utf8'});
        data = require(path.resolve('./' + tmpFile));
        fs.unlinkSync(tmpFile);
    }

    return writeFiles({
        data : data,
        type: type || 'json',
        target : target || "config"
    });
}