define(function(require){

  var App = require('app');
  var _comment = require('text!apps/comments/show/templates/comment.html');

  return App.module('Comments.Show', function(Show){

    Show.Comment = Marionette.ItemView.extend({
      template: Handlebars.compile( _comment ),
      events: {
        'click .js-expand': 'expandClicked'
      },
      expandClicked: function(e){
        e.preventDefault();
        this.trigger('expandClicked');
      }
    })

  });

});