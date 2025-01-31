module.exports = function(grunt) {
    var config = require('./config.json')
    grunt.loadNpmTasks('grunt-screeps');
    grunt.initConfig({
        screeps: {
            options: {
                token: config.token,
                branch: config.branch,
                ptr: config.ptr
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}