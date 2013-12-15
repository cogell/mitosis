define(function(require){

  var App = require('app');
  var _message = require('text!apps/chatroom/show/templates/message.html');

  return App.module('Chatroom.Show', function(Show){

    Show.Message = Marionette.ItemView.extend({
      template: Handlebars.compile( _message ),
      className: 'row'
    })

  });

});