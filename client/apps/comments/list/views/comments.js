define(function(require){

  var App = require('app');
  require('handlebars');
  var _comments = require('text!apps/comments/list/templates/comments.html');

  return App.module('Comments.List', function(List){

    List.Comments = Marionette.ItemView.extend({
      template: Handlebars.compile(_comments)
    })

  });

});