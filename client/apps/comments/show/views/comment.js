define(function(require){

  var App = require('app');
  var _comment = require('text!apps/comments/show/templates/comment.html');

  return App.module('Comments.Show', function(Show){

    Show.Comment = Marionette.ItemView.extend({
      template: Handlebars.compile( _comment ),
      className: function(){
        return 'item comment ' + this.model.get('size');
      },
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