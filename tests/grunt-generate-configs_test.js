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

    var target = process.env.GGG_target || 'config';

    var files = glob.sync(target + '/*.*').map(function(filepath){
        return path.basename(filepath, path.extname(filepath));
    });
    test.expect(1);
    test.deepEqual(files, tasks);
    test.done();
};