var fs = require('fs');
var yaml = require('js-yaml');
var coffee = require('js2coffee');

function jsonify(data){
    return JSON.stringify(data, null, 2);
}

/*
opts:
{
    target : 'config',
    type : 'json',
    data : <full grunt config object>,
    log : <function>
}
 */
module.exports = function writeFiles(opts){
    var handler;

    if(fs.existsSync(opts.target)){
        require('rimraf').sync(opts.target);
    }
    fs.mkdirSync(opts.target);

    switch(opts.type){
        case "json":
            handler = function(key){
                var filename = opts.target + '/' + key + '.json';
                fs.writeFileSync(filename, jsonify(opts.data[key]), {encoding:'utf8'});
                opts.log && opts.log('Generated: ' + filename);
            };
            break;
        case "yaml":
        case "yml":
            handler = function(key){
                var filename = opts.target + '/' + key + '.' + opts.type;
                fs.writeFileSync(filename, yaml.safeDump(opts.data[key]), {encoding:'utf8'});
                opts.log && opts.log('Generated: ' + filename);
            }
            break;
        case "coffee":
            handler = function(key){
                var filename = opts.target + '/' + key + '.coffee';
                fs.writeFileSync(filename,
                    coffee.build('module.exports = ' + jsonify(opts.data[key]), {indent : "  "}),
                    {encoding:'utf8'}
                );
                opts.log && opts.log('Generated: ' + filename);
            }
            break;
        case "js":
        case "module":
            handler = function(key){
                var filename = opts.target + '/' + key + '.js';
                fs.writeFileSync(filename, 'module.exports = ' + jsonify(opts.data[key]) + ';', {encoding:'utf8'});
                opts.log && opts.log('Generated: ' + filename);
            };
            break;
    }
    Object.keys(opts.data).forEach(handler);
}
