 module.exports = {
  options: {
    livereload: true
  },
  sass: {
    files: ['<%= app %>/**/*.scss'],
    tasks: ['sass:compile']
  },
  bootstrap: {
    files: ['<%= bower %>/bootstrap/less/*.less'],
    tasks: ['less:compileBS']
  },
  js: {
    files: ['<%= app %>/**/*.js'],
    tasks: ['copy:js']
  },
  html: {
    files: ['<%= app %>/apps/**/*.html'],
    tasks: ['copy:html']
  },
  index: {
    files: ['<%= app %>/assets/index.html'],
    tasks: ['copy:index']
  }
 }