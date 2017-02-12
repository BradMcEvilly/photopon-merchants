module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
    
    gtx.alias('build:dev', ['recess:less', 'clean:angular', 'copy:libs', 'copy:angulardev', 'recess:angulardev', 'concat:angular']);
    gtx.alias('build:landing', ['copy:landing', 'swig:landing']);
    gtx.alias('build:merchanthelp', ['copy:merchanthelp', 'swig:merchanthelp']);
    

    gtx.alias('build', ['build:dev',
                        'build:landing',
                        'build:merchanthelp',
                        'copy:qrlanding',
//                        'copy:landingbin',
//                        'copy:merchanthelpbin',
//                        'copy:merchantbin',
                        'copy:paypal',
                        'compress:createpackage',
                        'exec:uploadpackage']);

    gtx.alias('buildnu', ['build:dev',
                        'build:landing',
                        'build:merchanthelp',
                        'copy:qrlanding',
//                        'copy:landingbin',
//                        'copy:merchanthelpbin',
//                        'copy:merchantbin',
                        'copy:paypal']);

    gtx.finalise();
}
