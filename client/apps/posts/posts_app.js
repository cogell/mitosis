define(function(require){

  var App = require('app');
  require('apps/posts/show/show_controller');

  return App.module('Posts', function(Posts){

    // router
    Posts.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "posts/:id" : 'showPost'
      }
    });

    // Posts level api
    var API = {
      showPost: function(id){
        Posts.Show.Controller.showPost(id);
      }
    }

    // start router
    App.on('initialize:before', function(){
      new Posts.Router({
        controller: API
      })
    })

    // app level api
    App.on('posts:show', function(id){
      Backbone.history.navigate('posts/'+id);
      API.showPost(id);
    });

  });

});