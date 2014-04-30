/*
 * grunt-generate-configs
 * https://github.com/creynders/grunt-generate-configs
 *
 * Copyright (c) 2014 Camille Reynders
 * Licensed under the MIT license.
 *
 * Just in case you're wondering why I'm not eating my own dog food, i.e. using load-grunt-configs here, it's because
 * this grunt file is used to test the correct functioning of the grunt-generate-configs task.
 */

'use strict';


module.exports = function(grunt){

    var loadGruntConfigs = require('load-grunt-configs');

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint   : {
            all     : [
                'Gruntfile.js', 'tasks/*.js', '<%=nodeunit.tests%>'
            ],
            options : {
                jshintrc : '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean    : {
            config : [
                'config'
            ],
            tmp    : [
                '.tmp'
            ]
        },

        // Unit tests.
        nodeunit : {
            tests : [
                'tests/*_test.js'
            ]
        },

        markdown : {
            docs : {
                files   : [
                    {
                        expand : true,
                        src    : 'README.md',
                        dest   : '.tmp',
                        ext    : '.html'
                    }

                ],
                options : {
                    markdownOptions : {
                        gfm : true
                    }
                }
            }
        },
        watch    : {
            docs       : {
                files   : [
                    'README.md'
                ],
                tasks   : [
                    'clean:tmp', 'markdown:docs'
                ],
                options : {
                    livereload : true
                }
            },
            livereload : {
                options : {
                    livereload : '<%= connect.options.livereload %>'
                },
                files   : [
                    '.tmp/{,*/}*.html'
                ]
            }
        },
        connect  : {
            options    : {
                port       : 9000,
                livereload : 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname   : 'localhost'
            },
            livereload : {
                options : {
                    open : true,
                    base : [
                        '.tmp'
                    ]
                }
            }

        }
    });

    function generateConfigs(flags){
        grunt.task.run([
            'set_options:' + flags, 'clean:config', 'generate_configs', 'nodeunit', 'load-grunt-configs', 'clean:config'
        ]);
    }

    grunt.registerTask('load-grunt-configs', function(){
        loadGruntConfigs(grunt);
    });

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt test; grunt test --type=js; grunt test --target=foo; grunt test --type=yaml; grunt test --type=coffee
    grunt.registerTask('test', function(){
        grunt.loadTasks('tests/support');
        generateConfigs('');
        generateConfigs('--target=testConfig');
        generateConfigs('--type=js');
        generateConfigs('--type=json');
        generateConfigs('--type=yaml');
        generateConfigs('--type=yml');
        generateConfigs('--type=coffee');
        generateConfigs('--type=cson');
        generateConfigs('--cson');
        generateConfigs('--coffee');
        generateConfigs('--yaml');
        generateConfigs('--yml');
        generateConfigs('--js');
        generateConfigs('--json');
    });

    grunt.registerTask('preview', [
        'clean:tmp', 'markdown:docs', 'connect:livereload', 'watch'
    ]);

    // By default, lint and run all tests.
    grunt.registerTask('default', [
        'jshint', 'test'
    ]);

};
