define(function(require){

  var App = require('app');
  require('Handlebars');
  var _stats = require('text!apps/comments/show/templates/stats.html');

  return App.module('Comments.Show', function(Show){

    Show.Stats = Marionette.ItemView.extend({
      template: Handlebars.compile( _stats )
    });

  });

});