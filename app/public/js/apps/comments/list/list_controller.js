define(function(require){

  var App = require('app');
  require('apps/comments/list/views/comments');
  require('apps/comments/list/views/comments_layout');
  require('apps/comments/list/views/new_comment');

  return App.module('Comments.List', function(List){

    List.Controller = {
      listComments: function(forId){
        var controller = this;
        // display loading view in comments region

        this.layout = new List.CommentsLayout();
        var newComment = new List.NewComment({
          model: new App.Entities.Comment()
        });


        // fetch entities
        var fetchingComments = App.request('entities:comments', forId);
        $.when(fetchingComments).done(function(comments){

          // init views
          var view;

          if (comments !== undefined ){

            view = new List.Comments({
              collection: comments
            })

            controller.layout.on('show', function(){
              this.newComment.show( newComment );
              this.comments.show( view );
            });

            newComment.on('comment:submit', controller.newCommentSubmited)


          } else {
            // handle the case where comments come back undefined
          }

          // display layout in comments region
          App.commentsRegion.show( controller.layout );

        });

      },
      resetNewComment: function(){
        var newComment = new List.NewComment({
          model: new App.Entities.Comment()
        });
        newComment.on('comment:submit', List.Controller.newCommentSubmited)
        this.layout.newComment.show( newComment );
      },
      newCommentSubmited: function(){
        console.log( "what is this?", this );
        console.log('about to save new comment...');
        // get post id
        // console.log(this.model);
        this.model.save({}, {
          success: function(m, r, o){
            console.log('new comment save succeded.');
            // console.log( "saved model: ", m );
            List.Controller.resetNewComment();
            // add new comment to comments collection
          },
          error: function(m, x, o){
            console.log('new comment save error.');
            // handle error
          }
        });
      }

    }

  });

});