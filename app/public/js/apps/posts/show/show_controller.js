define(function(require){

  var App = require('app');
  require('apps/posts/show/views/post');

  return App.module('Posts.Show', function(Show){

    Show.Controller = {
      showPost: function(id){

        // display loading view in main region

        // cue comments
        App.trigger('comments:list', 1);

        // init view
        var view = new Show.Post();

        // fetch post

        // display post in main region
        App.mainRegion.show( view );
      }
    }

  });

});