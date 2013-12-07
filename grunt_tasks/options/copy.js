module.exports = {
  js: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= app %>',
      dest: '.tmp/',
      src: '**/*.js'
    }]
  }
}