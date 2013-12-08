require.config({
  paths:{
    jquery: 'vendor/jquery/jquery',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap.js',
    bootstrap: 'vendor/masonry/masonry.js'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});