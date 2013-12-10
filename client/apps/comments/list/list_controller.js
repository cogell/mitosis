define(function(require){

  var App = require('app');
  require('apps/comments/list/views/comments');

  return App.module('Comments.List', function(List){

    List.Controller = {
      listComments: function(id){
        // display loading view in comments region

        // init views
        var view = new List.Comments();

        // fetch entities

        // display layout in comments region
        App.commentsRegion.show( view );
      }
    }

  });

});