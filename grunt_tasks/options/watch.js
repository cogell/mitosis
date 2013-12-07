 module.exports = {
  options: {
    livereload: true
  },
  sass: {
    files: ['<%= app %>/**/*.scss'],
    tasks: ['sass:compile']
  },
  bootstrap: {
    files: ['<%= bower %>/dist/less/*.less'],
    tasks: ['less:compileBS']
  },
  js: {
    files: ['<%= app %>/**/*.js'],
    tasks: ['copy:js']
  },
  index: {
    files: ['<%= app %>/assets/index.html'],
    tasks: ['copy:index']
  }
 }