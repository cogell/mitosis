define(function(require){

  var App = require('app');
  require('Handlebars');
  var _post = require('text!apps/posts/show/templates/post.html')

  return App.module('Posts.Show', function(Show){

    Show.Post = Marionette.ItemView.extend({
      template: Handlebars.compile(_post)
    });

  });

});