var fs = require('fs');

function filesExist(source, filenames){
    var found = true;
    filenames.forEach(function(filename){
        found = found && source.indexOf(filename) > -1;
    });
    return found;
}

exports['suite'] = function(test){
    test.expect(1);
    test.ok(true);
    test.done();
};

exports['config files created'] = function(test){
    var files = fs.readdirSync('config');
    var allfound = filesExist(files,
    [
        'clean.json',
        'jshint.json',
        'nodeunit.json',
        'markdown.json',
        'watch.json',
        'connect.json'
    ]);
    test.expect(1);
    test.ok(allfound);
    test.done();
};