define(function(require){

  var App = require('app');
  require('apps/menu/show/views/menu');

  return App.module('Menu.Show', function(Show){

    Show.Controller = {
      showMenu: function(){

        // init view
        var menu = new Show.Menu();
        // display view in header region
        App.headerRegion.show(menu);


      }
    }

  });

});