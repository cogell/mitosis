define(function(require){

  var App = require('app');
  require('apps/comments/list/views/comments');
  require('apps/comments/list/views/comments_layout');
  require('apps/comments/list/views/new_comment');

  return App.module('Comments.List', function(List){

    List.Controller = {
      listComments: function(forId){
        // display loading view in comments region

        var layout = new List.CommentsLayout();
        var newComment = new List.NewComment();


        // fetch entities
        var fetchingComments = App.request('entities:comments', forId);
        $.when(fetchingComments).done(function(comments){

          // init views
          var view;

          if (comments !== undefined ){

            view = new List.Comments({
              collection: comments
            })

            layout.on('show', function(){
              layout.newComment.show( newComment );
              layout.comments.show( view );
            });


          } else {
            // handle the case where comments come back undefined
          }

          // display layout in comments region
          App.commentsRegion.show( layout );

        });

      }
    }

  });

});