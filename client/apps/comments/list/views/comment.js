define(function(require){

  var App = require('app');
  var _comment = require('text!apps/comments/list/templates/comment.html');

  return App.module('Comments.List', function(List){

    List.Comment = Marionette.ItemView.extend({
      template: Handlebars.compile( _comment ),
      events: {
        'click .js-expand': 'expandClicked'
      },
      expandClicked: function(e){
        e.preventDefault();
        console.log('Expand clicked');
      }
    })

  });

});