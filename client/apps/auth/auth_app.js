define(function(require){

  var App = require('app');

  return App.module('Auth', function(Auth){
    Auth.currentUser = "You Person"

    var API = {
      getCurrentUser:function(){
        return Auth.currentUser;
      }
    }

    App.reqres.setHandler('auth:currentuser', function(){
      return API.getCurrentUser();
    });
  });

});