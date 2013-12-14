define(function(require){

  var App = require('app');
  require('Handlebars');
  var _commentLayout = require('text!apps/comments/show/templates/comment_layout.html');

  return App.module('Comments.Show', function(Show){

    Show.CommentLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _commentLayout ),
      className: function(){
        return 'item comment ' + this.model.get('size');
      },
      regions: {
        commentRegion: '.comment-container',
        chatroomRegion: '.chatroom-container'
      }
    })

  });

});