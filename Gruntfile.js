/*global module, require*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        handlebars: {
            "template" : {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function (path) {
                        var parts = path.split('/');
                        return parts[parts.length - 1].split('.')[0];
                    }
                },
                files: {
                    "tmp/stud-hbs.js" : ["src/hbs/**/*.hbs", 'src/hbs/*.hbs']
                }
            },
            "static" : {
                options: {
                    processName: function (path) {
                        var parts = path.split('/');
                        return parts[parts.length - 1].split('.')[0];
                    },
                    commonjs: true
                },
                files: {
                    "tmp/static-html.js" : ["src/html/**/*.html", 'src/html/*.html']
                }
            }
        },
        concat: {
            css: { files: {
                "bld/stud-dev.css": [
                    "node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "src/css/*.css"
                ]
            } },
            js: { files: {
                "bld/stud-dev.js": [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/bootstrap/dist/js/bootstrap.min.js",
                    "node_modules/handlebars/dist/handlebars.runtime.min.js",
                    "node_modules/director/build/director.min.js",
                    "tmp/stud-hbs.js",
                    "src/js/*.js"
                ]
            } }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    src: [
                        'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
                        'src/png/*.png'
                    ],
                    dest: "bld/",
                    flatten: true
                }]
            }
        },
        qunit: {
            files: ['dev/test.html']
        },
        watch: {
            all: {
                files: ['src/**'],
                tasks: ['build']
            }
//            hbs: {
//                files: ['src/hbs/**'],
//                tasks: ['handlebars:template', 'concat:js', 'clean:tmp']
//            },
//            html: {
//                files: ['src/html/**'],
//                tasks: ['handlebars:static', 'static', 'clean:tmp']
//            },
//            css: {
//                files: ['src/css/**'],
//                tasks: ['concat:css']
//            },
//            js: {
//                files: ['src/js/**'],
//                tasks: ['concat:js']
//            },
//            manifest: {
//                files: ['package.json'],
//                tasks: ['manifest']
//            }
        },
        clean: {
            bld: ['bld'],
            tmp: ['tmp']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('manifest', 'build chrome manifest', function () {
        var man, pkg;
        pkg = grunt.file.readJSON('package.json');
        man = pkg.manifest;
        man.name = pkg.name;
        man.version = pkg.version;
        man.description = pkg.description;
        grunt.file.write("bld/manifest.json", JSON.stringify(man));
        grunt.log.writeln("File: bld/manifest.json created");
        return true;
    });

    grunt.registerTask('static', function () {
        var pkg, Handlebars;
        Handlebars = require('handlebars');
        pkg = grunt.file.readJSON('package.json');
        Handlebars.templates = require('./tmp/static-html.js')(Handlebars);
        Handlebars.partials = Handlebars.templates;
        grunt.file.write('bld/stud-dev.html', Handlebars.templates['stud-main']({name: pkg.name}));
    });

    grunt.registerTask('start', ['build', 'watch']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('build', ['clean', 'manifest', 'handlebars:template', 'handlebars:static', 'static', 'concat:css', 'concat:js', 'copy:assets', 'clean:tmp']);
};
