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
          var commentsView;

          if (comments !== undefined ){

            controller.collection = comments;

            commentsView = new List.Comments({
              collection: comments
            })

            controller.layout.on('show', function(){
              this.newComment.show( newComment );
              this.comments.show( commentsView );
            });

            newComment.on('comment:submit', controller.newCommentSubmited)

            commentsView.on('itemview:expandClicked', function(v, msg){
              console.log('event bubbled up to me');
            });

            App.on('socket:newComment', function(data){
              console.log('Comments.List received a new comment from the socket: ', data);
              List.Controller.collection.add( data )
            });


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
        console.log('about to save new comment...');

        this.model.save({}, {

          success: function(model, r, o){
            console.log('new comment save succeded.');

            List.Controller.resetNewComment();
            List.Controller.collection.add( model )
            App.trigger('comments:newComment', model);
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