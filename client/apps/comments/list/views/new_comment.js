define(function(require){

  var App = require('app');
  require('Handlebars');
  var _newComment = require('text!apps/comments/list/templates/new_comment.html');

  return App.module('Comments.List', function(List){

    List.NewComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _newComment )
    });

  });

});