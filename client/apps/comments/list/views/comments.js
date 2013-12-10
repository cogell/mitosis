define(function(require){

  var App = require('app');
  require('Handlebars');
  require('apps/comments/list/views/comment');

  return App.module('Comments.List', function(List){

    List.Comments = Marionette.CollectionView.extend({
      itemView: List.Comment,
      itemViewContainer: '.packery-container'
    })

  });

});