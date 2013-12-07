require.config({
  paths:{
    jquery: 'vendor/jquery/jquery',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap.js'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});