define(function(require){

  var App = require('app');
  require('apps/chatroom/show/views/message');

  return App.module('Chatroom.Show', function(Show){

    Show.Messages = Marionette.CollectionView.extend({
      itemView: Show.Message,
      onAfterItemAdded: function(){
        this.trigger('itemAdded');
      }
    })

  });

});