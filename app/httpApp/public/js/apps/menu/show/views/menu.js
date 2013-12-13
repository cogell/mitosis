define(function(require){

  var App = require('app');
  require('Handlebars');
  var _menu = require('text!apps/menu/show/templates/menu.html');


  return App.module('Menu.Show', function(Show){

    Show.Menu = Marionette.ItemView.extend({
      template: Handlebars.compile( _menu )
    });

  });

});