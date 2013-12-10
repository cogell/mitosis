define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Comment = Backbone.Model.extend({
      url: 'comments/'
    });

    Entities.Comments = Backbone.Collection.extend({
      url: 'comments/'
    });

    App.on('entities:comments', function(id){

      // make a defer object

      // define events on defer object

      // return defer.promise

    });

  });

});