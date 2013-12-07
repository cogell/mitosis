module.exports = {
  index: {
    src: '<%= app %>/assets/index.html',
    dest: '<%= dist %>/index.html'
  },
  dependencies: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= bower %>',
      dest: '<%= dist %>/vendor',
      src: [
        'jquery/jquery.js',
        'bootstrap/dist/js/bootstrap.js',
        'masonry/masonry.js'
      ]
    }]
  },
  js: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= app %>',
      dest: '<%= dist %>',
      src: '**/*.js'
    }]
  },
  requirejs: {
    src: 'bower_components/requirejs/require.js',
    dest: '<%= dist %>/require.js'
  },
}