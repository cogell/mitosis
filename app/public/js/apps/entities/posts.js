define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Post = Backbone.Model.extend({
      // url: function(){
      //   return '/api/posts/' + this.id;
      // }
      url: '/api/posts/1'
    });

    var API = {
      getPostEntity: function(id){
        // var post = new Entities.Post({id: id});
        var post = new Entities.Post();
        var defer = $.Deferred();
        console.log('fire');
        post.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(err){
            defer.resolve(undefined);
          }
        });

        return defer.promise();
      }
    };

    App.reqres.setHandler('entity:post', function(id){
      return API.getPostEntity();
    });

  });

});