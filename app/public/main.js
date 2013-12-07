require(['require_config'], function(){
  require(['jquery'], function($){
    $(document).ready(function(){
      console.log('dom ready and js coming in via require');
    })
  });
});