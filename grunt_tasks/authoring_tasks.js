module.exports = function(grunt){

  grunt.registerTask('dev', [
    // clean?
    // compile sass
    'sass:dev'
  ]);

  grunt.registerTask('dev:server', [
    'dev',
    'watch'
  ]);

  grunt.registerTask('default', ['dev:server'])

}