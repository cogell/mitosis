define(function(require){

  var App = require('app');
  require('backbone.stickit');
  require('jquery.dotdotdot');
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
        'click .js-join': 'expandClicked',
        'click .js-show-stats': 'statsClicked',

        'mouseover .js-vote': 'toolHovered',
        'mouseover .js-join': 'toolHovered',
        'mouseover .js-show-stats': 'toolHovered'
      },
      onShow: function(){
        this.stickit();
        this.$el.find('.comment-text').dotdotdot({
          watch: true,
        });

        this.initTooltips();
        this.on('hideToolTips', this.hideToolTips, this);
      },
      expandClicked: function(e){
        e.preventDefault();
        this.trigger('expandClicked');
        this.trigger('statsHide');
      },
      shrinkClicked: function(e){
        e.preventDefault();
        this.trigger('shrinkClicked');
      },
      voteClicked: function(e){
        e.preventDefault();
        this.trigger('voteClicked');
        this.trigger('statsHide');
      },
      statsClicked: function(e){
        e.preventDefault();
        if (!this.statsShown){
          this.statsShown = true;
          this.trigger('statsShow');
        } else {
          this.statsShown = false;
          this.trigger('statsHide');
        }
      },

      // voting tooltips
      initTooltips:function(){
        this.voteTool = this.$el.find('.js-vote').tooltip();

        this.peopleTool = this.$el.find('.js-join').tooltip();

        this.statsTool = this.$el.find('.js-show-stats').tooltip();
      },
      toolHovered: function(){
        this.trigger('toolhovered');
      },
      hideToolTips:function(){
        this.voteTool.tooltip('hide');
        this.peopleTool.tooltip('hide');
        this.statsTool.tooltip('hide');
      }


    })

  });

});