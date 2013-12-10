define(function(require){

  var App = require('app');
  var Handlebars = require('handlebars');
  var _post = require('text!apps/posts/show/templates/post.html')

  return App.module('Posts.Show', function(Show){

    Show.Post = Marionette.ItemView.extend({
      template: Handlebars.compile(_post)
    });

  });

});