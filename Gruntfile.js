(function () {
    "use strict";

    module.exports = function (grunt) {
        grunt.initConfig({

            appDir: 'app',
            builtDir: 'app-built',

            // RequireJS tasks
            requirejs: {
                main: {
                    options: {
                        mainConfigFile: '<%= appDir %>/app.js',
                        appDir: '<%= appDir %>',
                        baseUrl: './js',
                        fileExclusionRegExp: /^css$/,
                        dir: '<%= builtDir %>',
                        optimizeCss: 'none',
                        optimize: 'none',
                        modules: [
                            {
                                name: 'app',
                                include: []
                            }
                        ]
                    }
                }
            },

            // Compass tasks
            compass: {
                prod: {
                    options: {
                        sassDir: '<%= builtDir %>/sass',
                        cssDir: '<%= builtDir %>/css',
                        environment: 'prod',
                        outputStyle: 'compressed'
                    }
                },
                dev: {
                    options: {
                        sassDir: '<%= appDir %>/assets/sass',
                        cssDir: '<%= appDir %>/assets/css',
                        outputStyle: 'expanded'
                    }
                }
            },

            // Uglify js files
            uglify: {
                build: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= builtDir %>',
                            src: 'app/**/*.js',
                            dest: '<%= builtDir %>'
                        }
                    ]
                }
            },

            // Jshint tasks
            jshint: {
                all: [
                    'Gruntfile.js',
                    '<%= appDir %>/*.js',
                    '<%= appDir %>/**/*.js'
                ]
            },

            // Watch tasks
            watch: {

                // Watch javascript files and run jshint
                scripts: {
                    files: [
                        '<%= appDir %>/**/*.js',
                        '<%= appDir %>/*.js'
                    ],
                    tasks: ['jshint', 'karma:dev:run']
                },

                // Watch sass files and compile with compass
                compass: {
                    files: [
                        '<%= appDir %>/assets/sass/*.scss'
                    ],
                    tasks: ['compass:dev']
                }
            },

            // Terminal commands
            exec: {
                run: {
                    //cmd: 'node_modules/nw/bin/nw ./'
                }
            },

            bgShell: {
                _defaults: {
                    bg: true
                },
                runNW: {
                    cmd: 'node_modules/nw/bin/nw ./'
                }
            },

            // Unit test with Karma
            karma: {
                options: {
                    configFile: 'karma.conf.js'
                },
                dev: {
                    background: true
                },
                singleRun: {
                    singleRun: true
                }
            },

            // Clean folders
            clean: {
                //assetsBuilt: ["web/assets-built"]
            }
        });

        // Execute all test commands
        grunt.registerTask('test',
            '# Taskgroup: exec all test\'s',
            [
                'karma:singleRun'
            ]);

        // Dev task group
        grunt.registerTask('dev',
            '# Taskgroup: Start development environment.',
            [
                'jshint',
                'compass:dev',
                'bgShell:runNW',
                'watch'
            ]);

        // Prod task group
        grunt.registerTask('prod',
            '# Taskgroup: Compile production environment.',
            [
                //'jshint'
            ]);

        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-compass');
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-confirm');
        grunt.loadNpmTasks('grunt-continue');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-bg-shell');

    };

})();