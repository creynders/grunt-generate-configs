var fs = require('fs');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var argv = require('minimist')(process.argv);

exports['suite'] = function(test){
    test.expect(1);
    test.ok(true);
    test.done();
};

exports['config files created'] = function(test){
    var tasks = [ 'clean', 'connect', 'jshint', 'markdown', 'nodeunit', 'watch' ];

    var target = argv.target || 'config';

    var files = glob.sync(target + '/*.js*').map(function(filepath){
        return path.basename(filepath, path.extname(filepath));
    });

    var diff = _.difference(files, tasks);
    test.expect(1);
    test.equal(diff.length, 0);
    test.done();
};