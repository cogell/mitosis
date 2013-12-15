define(function(require){

  var App = require('app');
  require('backbone.stickit');
  require('Handlebars');
  var _comment = require('text!apps/comments/show/templates/comment.html');

  return App.module('Comments.Show', function(Show){

    Show.Comment = Marionette.ItemView.extend({
      template: Handlebars.compile( _comment ),
      bindings: {
        '.js-ups': 'ups'
      },
      events: {
        'click .js-expand': 'expandClicked',
        'click .js-shrink': 'shrinkClicked',
        'click .js-vote': 'voteClicked',
      },
      onShow: function(){
        this.stickit();
      },
      expandClicked: function(e){
        e.preventDefault();
        this.trigger('expandClicked');
      },
      shrinkClicked: function(e){
        e.preventDefault();
        this.trigger('shrinkClicked');
      },
      voteClicked: function(e){
        e.preventDefault();
        this.trigger('voteClicked');
      }

    })

  });

});