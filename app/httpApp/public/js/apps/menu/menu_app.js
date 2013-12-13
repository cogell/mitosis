define(function(require){

  var App = require('app');
  require('apps/menu/show/show_controller');

  return App.module('Menu', function(Menu){

    var API = {
      showMenu: function(){
        Menu.Show.Controller.showMenu();
      }
    }

    App.on('initialize:before', function(){
      API.showMenu();
    });

  });

});