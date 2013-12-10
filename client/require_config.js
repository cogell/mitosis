require.config({
  paths:{

    // base
    jquery: 'vendor/jquery/jquery',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap',

    // core
    backbone: 'vendor/backbone/backbone',
    underscore: 'vendor/underscore/underscore',
    marionette: 'vendor/marionette/lib/backbone.marionette',
    Handlebars: 'vendor/handlebars/handlebars',
    text: 'vendor/text/text',

    // packery
    packeryPkg: 'vendor/packery.pkgd',
    packery: 'vendor/packery/js/packery',
    packer: 'vendor/packery/js/packer',
    item: 'vendor/packery/js/item',
    rect: 'vendor/packery/js/rect',

    outlayer: 'vendor/outlayer',
    'get-size': 'vendor/get-size',
    classie: 'vendor/classie'
  },
  shim: {
    bootstrap: ['jquery'],
    backbone: ['underscore'],
    handlebars: {
      exports: 'Handlebars'
    },
    marionette: {
      deps: ['jquery', 'backbone', 'underscore'],
      exports: 'Backbone.Marionette'
    }
  }
});