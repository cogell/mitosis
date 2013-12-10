define(function(require){

  var App = require('app');
  require('apps/posts/show/views/post');

  return App.module('Posts.Show', function(Show){

    Show.Controller = {
      showPost: function(id){

        // display loading view in main region

        // cue comments
        App.trigger('comments:list', 1);

        // fetch post
        var fetchingPost = App.request('entity:post', id);
        $.when(fetchingPost).done(function(post){

          // init view
          var view;

          if (post !== undefined){
            console.log('post returned: ', post);
            view = new Show.Post({
              model: post
            });
          }
          else {
            // handle the case where post comes back with an error
            view = new Show.Post();
          }

          // display post in main region
          App.mainRegion.show( view );

        });
      }
    }

  });

});