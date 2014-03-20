var typeFlags = require('../../tasks/generate_configs' ).typeFlags;

module.exports = function(grunt){

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var opts = ['type', 'target'].concat(typeFlags);

    grunt.registerTask('set_options',function(flags){
        opts.forEach(function(opt){
            grunt.option(opt, undefined);
            delete process.env['GGG_' + opt];
        });

        var argv = require('minimist')(flags.split(' '));
        delete argv._;

        for(var flag in argv){
            grunt.option(flag, argv[flag]);
            process.env['GGG_' + flag] = argv[flag];
        };
        if(! argv.target){
            grunt.option('target', 'config');
        }
        grunt.config('clean.config', grunt.option('target'));
    });
}