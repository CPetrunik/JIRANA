/*global module*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    namespace: 'stud.templates',
                    processName: function (path) {
                        var parts = path.split('/');
                        return parts[parts.length - 1].split('.')[0];
                    }
                },
                files: {
                    "tmp/stud-handlebars.js" : ["src/hbs/**/*.hbs", 'src/hbs/*.hbs']
                }
            }
        },
        concat: {
            css: { files: {
                "bld/stud-dev.css": [
                    "lib/bootstrap.css",
                    "src/css/stud-extend-bootstrap.css",
                    "src/css/stud-search-result.css"
                ]
            } },
            js: { files: {
                "bld/stud-dev.js": [
                    "lib/jquery.min.js",
                    "lib/bootstrap.min.js",
                    "lib/handlebars.min.js"
                ]
            } }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    src: 'src/html/stud-main.html',
                    dest: "bld/stud-dev.html",
                    flatten: true
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    src: ['lib/glyphicons.woff', 'img/*.png'],
                    dest: "bld/",
                    flatten: true
                }]
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            hbs: {
                files: ['src/hbs/**'],
                tasks: ['handlebars:compile', 'concat:js', 'clean:tmp']
            },
            html: {
                files: ['src/html/**'],
                tasks: ['copy:html']
            },
            css: {
                files: ['src/css/**'],
                tasks: ['concat:css']
            },
            js: {
                files: ['src/js/**'],
                tasks: ['concat:js']
            },
            manifest: {
                files: ['package.json'],
                tasks: ['manifest']
            }
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


    });

    grunt.registerTask('start', ['build', 'watch']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('build', ['clean', 'manifest', 'handlebars:compile', 'concat:css', 'concat:js', 'copy:html', 'copy:assets', 'clean:tmp']);

};
