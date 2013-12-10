define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Comment = Backbone.Model.extend({
      url: '/api/comments/'
    });

    Entities.Comments = Backbone.Collection.extend({
      url: function(){
        if (this.forId){
          return '/api/comments/for/' + this.forId
        }
      },
      initialize: function(options){
        this.forId = options.forId
      }

    });

    var API = {
      getCommentEntities: function(id){
        var comments = new Entities.Comments({forId: id});
        var defer = $.Deferred();

        comments.fetch({
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

    App.reqres.setHandler('entities:comments', function(id){
      return API.getCommentEntities(id);
    });

  });

});