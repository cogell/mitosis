define(function(require){

  var App = require('app');
  var _comments_layout = require('text!apps/comments/list/templates/comments_layout.html');

  return App.module('Comments.List', function(List){

    List.CommentsLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _comments_layout ),
      regions: {
        newComment: '#new-comment',
        comments: '.comments-container'
      }

    });

  });

});