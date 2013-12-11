require(['require_config'], function(){

  require([
    'bootstrap',

    'app',

    'socketio',

    'apps/entities/posts',
    'apps/entities/comments',

    'apps/menu/menu_app',
    'apps/posts/posts_app',
    'apps/comments/comments_app'

    ], function(bootstrap, App, io){

    App.start();

    var socket = io.connect('/');

    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });

    socket.on('newComment', function (data) {
      App.Comments.List.Controller.collection.add(data);
    });


  });

});