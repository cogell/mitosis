// Utility Function

function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}

module.exports = function(grunt){

  // load all the grunt task plugins
  require('matchdep').filterDev('grunt-*').forEach(function(str){
    grunt.loadNpmTasks(str);
  });

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    app: 'client',
    dist: 'app/public'
  }

  // load in all the task options
  grunt.util._.extend(config, loadConfig('./grunt_tasks/options/'));

  // load up config
  grunt.initConfig(config);

  // load in all the custom tasks
  grunt.loadTasks('grunt_tasks');

}