define(function(require){

  var App = require('app');
  require('apps/posts/show/controller');

  return App.module('Posts', function(Posts){

    // router
    Posts.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "posts/:id" : 'showPost'
      }
    });

    // router api
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