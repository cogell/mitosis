module.exports = {
  index: {
    src: '<%= app %>/assets/index.html',
    dest: '<%= dist %>/index.html'
  },
  dep: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= bower %>',
      dest: '<%= dist %>/js/vendor',
      src: [
        // base
        'jquery/jquery.js',
        'bootstrap/dist/js/bootstrap.js',

        // core
        'backbone/backbone.js',
        'underscore/underscore.js',
        'marionette/lib/backbone.marionette.js',
        'handlebars/handlebars.js',
        'text/text.js',
        'socket.io-client/dist/socket.io.js',

        // nice-to-haves
        'backbone.stickit/backbone.stickit.js',
        'jquery.dotdotdot/src/js/jquery.dotdotdot.js',

        // packery
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
  html: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= app %>/apps/',
      dest: '<%= dist %>/js/apps/',
      src: '**/*.html'
    }]
  },
  fonts: {
    files: [{
      expand: true,
      flatten: true,
      dot: true,
      cwd: '<%= bower %>',
      dest: '<%= dist %>/css/fonts',
      src: [
        'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
        'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
        'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
        'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
      ]
    }]
  },
  js: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= app %>',
      dest: '<%= dist %>/js/',
      src: '**/*.js'
    }]
  },
  requirejs: {
    src: 'bower_components/requirejs/require.js',
    dest: '<%= dist %>/js/require.js'
  },
}