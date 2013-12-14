define(function(require){

  var App = require('app');
  require('apps/comments/list/list_controller');
  require('apps/comments/show/show_controller');

  return App.module('Comments', function(Comments){

    // Comments level api
    var API = {
      listComments: function(id){
        Comments.List.Controller.listComments(id);
      },
      showComment: function(model){
        return Comments.Show.Controller.showComment(model);
      }
    }

    // app level api
    App.on('comments:list', function(id){
      API.listComments(id);
    });

    App.reqres.setHandler('comment:show', function(model){
      return API.showComment(model);
    });

  });

});