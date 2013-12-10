define(function(require){

  var App = require('app');
  require('apps/comments/list/views/comments');

  return App.module('Comments.List', function(List){

    List.Controller = {
      listComments: function(forId){
        // display loading view in comments region


        // fetch entities
        var fetchingComments = App.request('entities:comments', forId);
        $.when(fetchingComments).done(function(comments){

          // init views
          var view;

          if (comments !== undefined ){

            view = new List.Comments({
              // collection:
              model: comments
            })


          } else {
            // handle the case where comments come back undefined
          }

          // display layout in comments region
          App.commentsRegion.show( view );

        });

      }
    }

  });

});