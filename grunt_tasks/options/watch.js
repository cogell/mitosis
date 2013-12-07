 module.exports = {
  options: {
    livereload: true
  },
  sass: {
    files: ['<%= app %>/**/*.scss'],
    tasks: ['sass:compile']
  },
  js: {
    files: ['<%= app %>/**/*.js'],
    tasks: ['copy:js']
  }
 }