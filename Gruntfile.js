'use strict';
var exec = require('child_process').exec;
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        nodewebkit: {
            options: {
                build_dir: './webkitbuilds', // Where the build version of my node-webkit app is saved
                mac: true, // We want to build it for mac
                win: true, // We want to build it for win
                linux32: false, // We don't need linux32
                linux64: true // We don't need linux64
            },
            src: ['build/production/SpinningFactory/**/*'] // Your node-wekit app
        },
        watch: {
            run : {
                files: 'build/production/SpinningFactory/*',
                tasks: ['run']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['watch', 'copy']);

    grunt.registerTask('run', 'Run node-webkit app', function () {
        exec('nw app.nw');
    });

};
