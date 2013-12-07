module.exports = function(grunt){

  grunt.registerTask('dev', [
    'clean:tmp',
    'copy:js',
    'sass:dev'
  ]);

  grunt.registerTask('dev:server', [
    'dev',
    'watch'
  ]);

  grunt.registerTask('default', ['dev:server'])

}