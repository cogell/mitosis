require(['require_config'], function(){

  require([
    'jquery',
    'bootstrap',
    'packeryPkg',
    'packery',

    'app',

    'apps/entities/posts',
    'apps/entities/comments',

    'apps/menu/menu_app',
    'apps/posts/posts_app',
    'apps/comments/comments_app'

    ], function($, bootstrap, packeryPkg, Packery, App){

    App.start();

    $(document).ready(function(){
      console.log('dom ready and js coming in via require');

      var cont = $('.packery-container')[0];
      window.pckry = new Packery( cont, {
        // options
        itemSelector: '.item',
        gutter: 0
      });
    });

  });

});