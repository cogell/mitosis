define(function(require){

  var App = require('app');
  var _commentLayout = require('text!apps/comments/list/templates/comment_layout.html');

  return App.module('Comments.List', function(List){

    List.CommentLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _commentLayout ),
      regions: {
        commentContainer: '.comment-container',
        chatroomContainer: '.chatroom-container'
      }
    })

  });

});