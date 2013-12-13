require(['require_config'], function(){

  require([
    'bootstrap',

    'app',

    'apps/socket/socket_app',

    'apps/entities/posts',
    'apps/entities/comments',
    'apps/entities/messages',

    'apps/auth/auth_app',
    'apps/menu/menu_app',
    'apps/posts/posts_app',
    'apps/comments/comments_app',
    'apps/chatroom/chatroom_app'

    ], function(bootstrap, App){

    App.start();

  });

});