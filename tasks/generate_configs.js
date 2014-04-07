/*
 * grunt-generate-configs
 * https://github.com/creynders/grunt-generate-configs
 *
 * Copyright (c) 2014 Camille Reynders
 * Licensed under the MIT license.
 */

'use strict';

var inquirer = require('inquirer');
var writeFiles = require('../lib/writeFiles');

var typeFlags = ['json', 'js', 'coffee', 'yaml', 'yml', 'cson'];

module.exports = function(grunt){

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks


    grunt.registerTask('generate_configs', 'Splits your grunt configuration into separate files', function(){
        var done = this.async();
        var generated;

        function complete(generated){
            if(generated && generated.length > 0){
                generated.forEach(function(filename){
                    grunt.log.writeln('Generated: ' + filename);
                });
                done(true);
            }else{
                done(false);
            }
        }

        typeFlags.forEach(function(typeFlag){
            if(grunt.option(typeFlag)){
                grunt.option('type', typeFlag);
            }
        });
        var type = grunt.option('type') || 'json';
        var opts = {
            target : grunt.option('target') || 'config',
            type   : type,
            data   : grunt.config.data
        };

        if(grunt.file.exists(opts.target) && !grunt.option('no-prompt')){
            inquirer.prompt([
                {
                    type    : "confirm",
                    message : "A directory '" + opts.target + "' already exists, its files will be overwritten.\nAre you sure you want to continue?",
                    name    : "overwrite",
                    default : false
                }
            ], function(answers){
                if(answers.overwrite){
                    complete(writeFiles(opts));
                }else{
                    complete();
                }
            });
        }else{
            complete(writeFiles(opts));
        }
    });
};

module.exports.typeFlags = typeFlags;
