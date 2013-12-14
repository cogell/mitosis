define(function(require){

  var App = require('app');
  require('apps/comments/show/views/comment');
  require('apps/comments/show/views/comment_layout');

  return App.module('Comments.Show', function(Show){

    Show.Controller = {
      showComment: function(model){

        var layout = new Show.CommentLayout();
        var comment = new Show.Comment({
          model: model
        });

        layout.on('show', function(){
          this.commentRegion.show(comment);
        });

        return layout;
      }
    }

  });

});