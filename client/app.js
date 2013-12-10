define(function(require){

  var Marionette = require('marionette');

  window.App = new Marionette.Application();

  App.addRegions({
    headerRegion: '#header',
    mainRegion: '#main'
  });

  App.on('initialize:after', function(){
    console.log('App started.');
    if(Backbone.history){
      Backbone.history.start();

      if (Backbone.history.fragment === ""){
        App.trigger('posts:show', 1);
      }
    }
  });

  return App;

});