define(function(require){

  var App = require('app');
  require('Handlebars');
  var _comments_layout = require('text!apps/comments/list/templates/comments_layout.html');

  return App.module('Comments.List', function(List){

    List.CommentsLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _comments_layout ),
      className: 'comments',
      regions: {
        newCommentRegion: '#new-comment-region',
        commentsRegion: '.comments-region',
        mapRegion: '#map-region'
      }

    });

  });

});