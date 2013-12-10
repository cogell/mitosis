module.exports = function(grunt) {

  grunt.registerTask('dev', [
    'clean:public',
    'concurrent:dev'
  ]);

  grunt.registerTask('dev:watch', [
    'dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'dev',
    'requirejs'
  ]);

  grunt.registerTask('default', ['dev:watch'])

}
