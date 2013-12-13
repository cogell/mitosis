module.exports = function(socket, vent, clientSockets, chatMap){

  socket.emit('hello', { hello: 'world' });

  socket.on('clientId', function(data){
    console.log('>>>>>>>>>>>>>>> clientID data:', data);
    vent.emit('newClient', socket, data.clientId);
  });

  socket.on('openChat', function(clientId, chatId){
    vent.emit('openChat', clientId, chatId);
  });

  socket.on('disconnect', function(socket){
    vent.emit('removeClient', socket);
  });

  socket.on('client:newComment', broadcastNewComment);

  socket.on('client:newMessage', broadcastNewMessage);

  function broadcastNewMessage(message){
    var listeningClients = chatMap[message.chatId];
    if (listeningClients.length > 0){

      listeningClients.forEach(function(clientId){
        clientSockets[clientId].emit('newMessage', message);
      });

    }
  }

  function broadcastNewComment(comment){
    if (clientSockets.length > 0){
      clientSockets.forEach(function(cs){
        cs.socket.emit('newComment', comment );
      });
    }
  }

}