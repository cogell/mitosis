module.exports = function(grunt){

  grunt.registerTask('dev', [
    'clean:public',
    'copy:index',
    'copy:dependencies',
    'copy:js',
    'copy:requirejs',
    'sass:compile'
  ]);

  grunt.registerTask('dev:watch', [
    'watch'
  ]);

  grunt.registerTask('build', [
    'dev',
    'requirejs'
  ]);

  grunt.registerTask('default', ['dev:watch'])

}