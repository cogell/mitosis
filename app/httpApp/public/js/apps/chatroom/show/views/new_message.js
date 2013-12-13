define(function(require){

  var App = require('app');
  require('backbone.stickit');
  require('Handlebars');
  var _newMessage = require('text!apps/chatroom/show/templates/new_message.html');

  return App.module('Chatroom.Show', function(Show){

    Show.NewMessage = Marionette.ItemView.extend({
      template: Handlebars.compile( _newMessage ),
      bindings: {
        '.new-message-body': 'body'
      },
      events: {
        'click .js-submit': 'submitClicked'
      },
      onRender:function(){
        this.stickit();
      },
      submitClicked:function(e){
        e.preventDefault();
        this.trigger('message:submit');
      }
    });

  });

});