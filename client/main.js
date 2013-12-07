require(['require_config'], function(){
  require([], function(){
    $(document).ready(function(){
      console.log('dom ready and js coming in via require');
    })
  });
});