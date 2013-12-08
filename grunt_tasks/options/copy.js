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
        'jquery-bridget/jquery.bridget.js',

        'packery/js/packery.js',
        'packery/js/packer.js',
        'packery/js/item.js',
        'packery/js/rect.js',
        'outlayer/outlayer.js',
        'get-size/get-size.js',
        'classie/classie.js'
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