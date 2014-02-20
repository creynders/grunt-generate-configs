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
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint   : {
            all     :
            [
                'Gruntfile.js',
                'tasks/*.js',
                '<%=nodeunit.tests%>'
            ],
            options : {
                jshintrc : '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean    : {
            config :
            [
                'config'
            ],
            tmp    :
            [
                '.tmp'
            ]
        },

        // Unit tests.
        nodeunit : {
            tests :
            [
                'tests/*_test.js'
            ]
        },

        markdown : {
            docs : {
                files   :
                [
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
                files   :
                [
                    'README.md'
                ],
                tasks   :
                [
                    'clean:tmp',
                    'markdown:docs'
                ],
                options : {
                    livereload : true
                }
            },
            livereload : {
                options : {
                    livereload : '<%= connect.options.livereload %>'
                },
                files   :
                [
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
                    base :
                    [
                        '.tmp'
                    ]
                }
            }

        }
    });

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', function(){
        if(grunt.option('target')){
            grunt.config('clean.config', grunt.option('target'));
        }
        grunt.task.run(
        [
            'clean:config',
            'generate_configs',
            'nodeunit',
            'clean:config'
        ]);
    });

    grunt.registerTask('preview',
    [
        'clean:tmp',
        'markdown:docs',
        'connect:livereload',
        'watch'
    ]);

    // By default, lint and run all tests.
    grunt.registerTask('default',
    [
        'jshint',
        'test'
    ]);

};
