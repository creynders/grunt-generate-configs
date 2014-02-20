/*
 * grunt-generate-configs
 * https://github.com/creynders/grunt-generate-configs
 *
 * Copyright (c) 2014 Camille Reynders
 * Licensed under the MIT license.
 */

'use strict';

var inquirer = require('inquirer');

function jsonify(data){
    return JSON.stringify(data, null, 2);
}

module.exports = function(grunt){

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerTask('generate_configs', 'Splits your grunt configuration into separate files', function(){
        var done = this.async();
        var target = grunt.option('target') || 'config';
        var type = grunt.option('type') || 'json';

        function writeFiles(){
            var handler;
            switch(type){
                case "json":
                    handler = function(key){
                        var filename = target + '/' + key + '.json';
                        grunt.file.write(filename, jsonify(grunt.config.data[key]));
                        grunt.log.writeln('Generated: ' + filename);
                    };
                    break;
                case "js":
                case "module":
                    handler = function(key){
                        var filename = target + '/' + key + '.js';
                        grunt.file.write(filename, 'module.exports = ' + jsonify(grunt.config.data[key]));
                        grunt.log.writeln('Generated: ' + filename);
                    };
                    break;
            }
            Object.keys(grunt.config.data).forEach(handler);
        }

        if(grunt.file.exists(target)){
            inquirer.prompt(
            [
                {
                    type    : "confirm",
                    message : "A directory '" + target + "' already exists, its files will be overwritten.\nAre you sure you want to continue?",
                    name    : "overwrite",
                    default : false
                }
            ], function(answers){
                if(answers.overwrite){
                    writeFiles();
                    done(true);
                }else{
                    done(false);
                }
            });
        }else{
            writeFiles();
            done(true);
        }
    });
};
