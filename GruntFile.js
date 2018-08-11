module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
    
    gtx.alias('build:dev', ['recess:less', 'clean:angular',
                        'copy:libs', 'copy:angulardev', 'recess:angulardev', 'concat:angular']);
    gtx.alias('build:landing', ['copy:landing', 'swig:landing']);
    gtx.alias('build:merchanthelp', ['copy:merchanthelp', 'swig:merchanthelp']);
    
    gtx.alias('build', ['ngconstant:development',
                        'build:dev',
                        'build:landing',
                        'build:merchanthelp',
                        'copy:qrlanding',
                        'copy:paypal']);

    gtx.alias('deploy', ['ngconstant:production',
                        'build:dev',
                        'build:landing',
                        'build:merchanthelp',
                        'copy:qrlanding',
                        'copy:paypal',
                        'compress:createpackage',
                        'exec:uploadpackage']);

    gtx.finalise();
}
