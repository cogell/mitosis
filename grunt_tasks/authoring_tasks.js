module.exports = function(grunt) {

  grunt.registerTask('dev', [
    'clean:public',
    'copy:index',
    'copy:dep',
    'copy:fonts',
    'copy:js',
    'copy:requirejs',
    'less:compileBS',
    'sass:compile'
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
