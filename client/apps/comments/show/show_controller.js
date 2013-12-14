define(function(require){

  var App = require('app');
  require('apps/comments/show/views/comment');
  require('apps/comments/show/views/comment_layout');

  return App.module('Comments.Show', function(Show){

    Show.Controller = {
      showComment: function(model){
        var controller = this;

        var layout = new Show.CommentLayout();
        var comment = new Show.Comment({
          model: model
        });

        layout.on('show', function(){
          this.commentRegion.show(comment);
        });

        comment.on('expandClicked', function(){

          // call out to app api for chatroom
          controller.chatroom = App.request('chatroom:show', 1);

          console.log('on expandClicked, we see returne to us a view: ', controller.chatroom);

          // coupled
          layout.chatroomRegion.show( controller.chatroom );

        });

        return layout;
      }
    }

  });

});