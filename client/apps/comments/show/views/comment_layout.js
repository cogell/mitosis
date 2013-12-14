define(function(require){

  var App = require('app');
  var _commentLayout = require('text!apps/comments/show/templates/comment_layout.html');

  return App.module('Comments.Show', function(Show){

    Show.CommentLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _commentLayout ),
      regions: {
        commentRegion: '.comment-container',
        chatroomRegion: '.chatroom-container'
      }
    })

  });

});