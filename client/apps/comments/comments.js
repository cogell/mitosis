define(function(require){

  var App = require('app');
  require('apps/comments/list/controller');

  return App.module('Comments', function(Comments){

    // Comments level api
    var API = {
      listComments: function(id){
        Comments.List.Controller.listComments(id);
      }
    }

    // app level api
    App.on('comments:list', function(id){
      API.listComments(id);
    });

  });

});