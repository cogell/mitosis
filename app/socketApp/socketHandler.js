module.exports = function(socket, vent, clientSockets, chatMap, _){

  socket.emit('handshake', { hello: "what's your name?" });

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

    console.log('chat map is: ', chatMap);
    console.log('chat id is: ', message.chatId);

    if (listeningClients.length > 0){

      listeningClients.forEach(function(clientId){
        clientSockets[clientId].emit('newMessage', message);
      });

    }
  }

  function broadcastNewComment(comment){
    if (clientSockets){
      _.each(clientSockets, function(v, k, l){
        v.emit('newComment', comment);
      });
    }
  }

}