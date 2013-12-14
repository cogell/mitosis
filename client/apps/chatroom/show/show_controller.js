define(function(require){

  var App = require('app');

  require('apps/chatroom/show/views/messages');
  require('apps/chatroom/show/views/chatroom_layout');
  require('apps/chatroom/show/views/new_message');

  return App.module('Chatroom.Show', function(Show){

    Show.Controller = {
      showChat: function(id){
        return this.getChatroomView(id);
      },
      getChatroomView: function(id){

        this.chatId = id;

        // init views
        this.layout = new Show.Chatroom();
        var newMessage = new Show.NewMessage({
          model: new App.Entities.Comment()
        });

        this.setHandlers( this.layout, newMessage, id );

        return this.layout;
      },
      setHandlers: function( layout, newMessage, id ){
        var controller = this;
        // var newMessage = newMessage;

        layout.on('render:newMessage', function(){
          console.log('show new message');

          this.newMessageRegion.show( newMessage );

          newMessage.on('message:submit', controller.newMessageSubmited);

          App.on('socket:newMessage', function(message){
              console.log('Chatroom controller recieved...');
              console.log('message: ', message);
              controller.collection.add(message);
            });

        });

        layout.on('render:messages', function(id){
          console.log('show messages');

          var fetchingMessages = App.request('entities:messages', id);

          $.when(fetchingMessages).done(function(messages){
            var messagesView;

            if (messages !== undefined){
              controller.collection = messages;
              messagesView = new Show.Messages({
                collection: messages
              });
            }
            else {
              controller.collection = [];
              // handle the case where there are no messages
            }

            App.trigger('comment:openChat', App.Socket.clientId, controller.chatId);

            layout.messagesRegion.show( messagesView );

          });

        });
      },
      resetNewMessage: function(){
        var newMessage = new Show.NewMessage({
          model: new App.Entities.Message()
        });
        newMessage.on('message:submit', Show.Controller.newMessageSubmited);
        this.layout.newMessageRegion.show( newMessage );
      },
      newMessageSubmited:function(){

        this.model.set( 'chatId', Show.Controller.chatId);
        this.model.set( 'user', App.request('auth:currentuser'));

        this.model.save({},{
          success: function(model, r, o){
            console.log('new message save successful');

            // reset new message
            Show.Controller.resetNewMessage();
            App.trigger('chatroom:newMessage', model);
          },
          error: function(m, x, o){
            console.log('new message save error.');
            // handle save error
          }
        });
      }

    } // closes controller

  });

});