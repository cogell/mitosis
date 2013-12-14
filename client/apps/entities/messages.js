define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Message = Backbone.Model.extend({
      url: '/api/messages/'
    })

    Entities.Messages = Backbone.Collection.extend({
      url: function(){
        // if (this.forId){
        //   return '/api/messages/for/' + this.forId
        // }
        return '/api/messages/for/' + 1
      },
      initialize: function(options){
        this.forId = options.forId
      }
    })
    var API = {
      getMessageEntities: function(id){
        var messages = new Entities.Messages({forId: id});
        var defer = $.Deferred();

        messages.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(err){
            defer.resolve(undefined);
          }
        });

        return defer.promise();
      }
    }

    App.reqres.setHandler('entities:messages', function(id){
      return API.getMessageEntities(id);
    })

  });

});