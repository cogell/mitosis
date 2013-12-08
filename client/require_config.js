require.config({
  paths:{
    jquery: 'vendor/jquery/jquery',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
    'jquery-bridget': 'vendor/jquery-bridget/jquery.bridget',

    packeryPkg: 'packery.pkgd',
    packery: 'vendor/packery/js/packery',
    packer: 'vendor/packery/js/packer',
    item: 'vendor/packery/js/item',
    rect: 'vendor/packery/js/rect',
    // outlayer: 'vendor/outlayer/outlayer',
    // 'get-size': 'vendor/get-size/get-size',
    // classie: 'vendor/classie/classie'

    outlayer: 'vendor/outlayer',
    'get-size': 'vendor/get-size',
    classie: 'vendor/classie'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});