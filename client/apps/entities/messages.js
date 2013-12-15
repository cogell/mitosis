define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Message = Backbone.Model.extend({
      url: '/api/messages/'
    });

    Entities.Messages = Backbone.Collection.extend({
      model: Entities.Message,
      url: function(){
        // if (this.forId){
        //   return '/api/messages/for/' + this.get('forId')
        // }
        return '/api/messages/for/' + 1
      },
      initialize: function(options){
        this.set('forId', options.forId);
      }

    });


    var API = {
      getMessageEntities: function(id){

        // if ( id === -1 || id === undefined){
        //   return this.noMessages();
        // }
        // else {
        //   return this.fetchMessages(id);
        // }

        return this.fetchMessages(id);
      },
      noMessages: function(){
        var defer = $.Deferred();
        var id = this.randomString(32)
        var data = new Entities.Messages({forId: id});

        return defer.promise();
      },
      fetchMessages: function(id){
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

      },
      randomString: function(length){
      var result = '';
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = length; i > 0 ; --i){
        result += chars[Math.round( Math.random() * (chars.length-1) )];
      }
      return result;
    }
    }

    App.reqres.setHandler('entities:messages', function(id){
      return API.getMessageEntities(id);
    })

  });

});