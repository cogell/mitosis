define(function(require){

  var App = require('app');

  return App.module('Posts.Show', function(Show){

    Show.Controller = {
      showPost: function(id){
        // console.log('you got all the way down to the controller');
      }
    }

  });

});