require(['require_config'], function(){
  require(['jquery', 'packeryPkg', 'packery'], function($, packeryPkg, Packery){

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