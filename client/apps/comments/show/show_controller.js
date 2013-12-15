define(function(require){

  var App = require('app');
  require('apps/comments/show/views/comment');
  require('apps/comments/show/views/comment_layout');
  require('apps/comments/show/views/stats');

  return App.module('Comments.Show', function(Show){

    Show.Controller = {
      showComment: function(model){
        var controller = this;

        var layout = new Show.CommentLayout({
          model: model
        });
        var comment = new Show.Comment({
          model: model
        });

        layout.on('show', function(){
          this.commentRegion.show(comment);
        });

        comment.on('statsShow', function(){
          var stats = new Show.Stats();
          layout.statsRegion.show( stats );
        });
        comment.on('statsHide', function(){
          layout.statsRegion.close();
        });

        comment.on('expandClicked', function(){

          controller.chatroom = App.request('chatroom:show', 1);
          layout.trigger('expand');
          layout.chatroomRegion.show( controller.chatroom );

        });

        comment.on('shrinkClicked', function(){

          layout.trigger('shrink');
          layout.chatroomRegion.close();

        });

        comment.on('voteClicked', function(){

          layout.trigger('upVote');
          this.model.trigger('upVote');

        });

        comment.on('toolhovered', function(){
          layout.trigger('toolhovered');
        });

        layout.on('hideToolTips', function(){
          comment.trigger('hideToolTips');
        });

        return layout;
      }
    }

  });

});