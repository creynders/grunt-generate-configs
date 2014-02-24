/*
 * grunt-generate-configs
 * https://github.com/creynders/grunt-generate-configs
 *
 * Copyright (c) 2014 Camille Reynders
 * Licensed under the MIT license.
 */

'use strict';

var inquirer = require('inquirer');
var writeFiles = require('./lib/writeFiles');

module.exports = function(grunt){

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerTask('generate_configs', 'Splits your grunt configuration into separate files', function(){
        var done = this.async();
        var opts = {
            target : grunt.option('target') || 'config',
            type : grunt.option('type') || 'json',
            data : grunt.config.data,
            log : grunt.log.writeln
        };

        if(grunt.file.exists(opts.target)){
            inquirer.prompt(
            [
                {
                    type    : "confirm",
                    message : "A directory '" + opts.target + "' already exists, its files will be overwritten.\nAre you sure you want to continue?",
                    name    : "overwrite",
                    default : false
                }
            ], function(answers){
                if(answers.overwrite){
                    writeFiles(opts);
                    done(true);
                }else{
                    done(false);
                }
            });
        }else{
            writeFiles(opts);
            done(true);
        }
    });
};
