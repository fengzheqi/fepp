'use strict';

var _ = require('lodash'),
    glob = require('glob');

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(patterns, removeRoot) {
    var _this = this;
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    var output = [];

    if (_.isArray(patterns)) {
        patterns.forEach(function(pattern) {
            output = _.union(output, _this.getGlobbedFiles(pattern, removeRoot));
        });
    } else if (_.isString(patterns)) {
        if (urlRegex.test(patterns)) {
            output.push(patterns);
        } else {
           if(glob.sync(patterns, {nodir: true}).length) {
                if (removeRoot) {
                    var files = glob.sync(patterns, {nodir: true})
                                    .map(function(file) {
                                        return file.replace(removeRoot, '');
                                    });
                }
               output = _.union(output, files);
           }
        }
    }
    return output;
};

