define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Post = Backbone.Model.extend({
      url: 'posts/'
    });

    App.on('entity:post', function(id){

      // make a defer object

      // define events on defer object

      // return defer.promise

    });

  });

});