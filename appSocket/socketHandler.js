module.exports = function(socket, vent, clientSockets){

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
    clientSockets.forEach(function(cs){
      // check to see what chats each client has open
      cs.socket.emit('newMessage', message);
    });
  }

  function broadcastNewComment(comment){
    clientSockets.forEach(function(cs){
      cs.socket.emit('newComment', comment );
    });
  }

}