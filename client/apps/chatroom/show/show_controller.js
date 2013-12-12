define(function(require){

  var App = require('app');

  require('apps/chatroom/show/views/messages');
  require('apps/chatroom/show/views/chatroom_layout');
  require('apps/chatroom/show/views/new_message');

  return App.module('Chatroom.Show', function(Show){

    Show.Controller = {
      joinChat: function(id){
        var controller = this;
        controller.chatId = id;

        // throw up loading view

        controller.layout = new Show.Chatroom();
        var newMessage = new Show.NewMessage({
          model: new App.Entities.Message()
        });

        console.log('here');

        // fetch chat messages
        var fetchingMessages = App.request('entities:messages', id);
        $.when(fetchingMessages).done(function(messages){
          var messagesView;

          if (messages !== undefined){

            messagesView = new Show.Messages({
              collection: messages
            });

            // listen for new message post
            // listen for message +1

          }
          else {
            // handle the case where there are no messages
          }

          App.trigger('socket:openChat', App.Socket.clientId, controller.chatId);

          newMessage.on('message:submit', controller.newMessageSubmited);

          controller.layout.on('show', function(){
            this.newMessage.show(newMessage);
            this.messages.show(messagesView);
          });

          App.on('socket:newMessage', function(data, chartId){
            console.log('in message controller and getting...');
            console.log('model: ', data);
            console.log('chartId: ', chartId);
            // if chartID = controller.chartId
            // then add model to controller.collection
            // else do nothing
          });

          // return layout view OR show layout view
          App.chatRegion.show( controller.layout );
        });


      },
      resetNewMessage: function(){
        var newMessage = new Show.NewMessage({
          model: new App.Entities.Message()
        });
        newMessage.on('message:submit', Show.Controller.newMessageSubmited);
        this.layout.newMessage.show( newMessage );
      },
      newMessageSubmited:function(){

        this.model.set( 'chatId', Show.Controller.chatId);
        this.model.set( 'user', App.request('auth:currentuser'));

        this.model.save({},{
          success: function(model, r, o){
            console.log('new message save successful');

            // reset new message
            Show.Controller.resetNewMessage();
            // add saved model to list of messages
          },
          error: function(m, x, o){
            console.log('new message save error.');
            // handle save error
          }
        });
      }
    }

  });

});