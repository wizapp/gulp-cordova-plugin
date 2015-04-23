'use strict';

/**
 * Creates a new cordova project in the current directory.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  22 April 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    cordova = require('cordova-lib').cordova.raw;

module.exports = function(plugin) {

    return through.obj(function(file, enc, cb) {
        process.env.PWD = file.path;

        // Pipe the file to the next step
        this.push(file);

        // Print which plugin will be added
        console.log('\tadd ' + plugin);

        // Execute the cordova plugin add command
        cordova.plugin('add', plugin)
            .then(cb)
            .catch(function(err) {
                // Return an error if something happened
                cb(new gutil.PluginError('gulp-cordova-plugin', err.message));
            });
    });
};
