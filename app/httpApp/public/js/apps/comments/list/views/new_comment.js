define(function(require){

  var App = require('app');
  require('Handlebars');
  require('backbone.stickit');
  var _newComment = require('text!apps/comments/list/templates/new_comment.html');

  return App.module('Comments.List', function(List){

    List.NewComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _newComment ),
      bindings: {
        '.new-comment-body': 'body'
      },
      events: {
        'click .js-submit': 'submitClicked'
      },
      onRender: function(){
        this.stickit();
      },
      submitClicked: function(e){
        e.preventDefault();
        this.trigger('comment:submit');
      }
    });

  });

});