define(function(require){

  var App = require('app');
  require('Handlebars');
  var _commentLayout = require('text!apps/comments/show/templates/comment_layout.html');

  return App.module('Comments.Show', function(Show){

    Show.CommentLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _commentLayout ),
      className: function(){
        return 'item comment ' + this.model.get('size');
      },
      regions: {
        commentRegion: '.comment-container',
        chatroomRegion: '.chatroom-container'
      },
      initialize: function(){
        this.on('upVote', this.upVoteHandler, this);
      },
      onShow:function(){
        this.model.on('newSize', this.updateSize, this);
      },
      upVoteHandler: function(){
        var that = this;

        this.$el.addClass('animate');

        setTimeout(function(){
          that.$el.removeClass('animate');
        }, 1000);

        // this.el.addEventListener("animationend", this.upVoteAnimEnd, false);
      },
      updateSize: function(oldSize){
        this.$el.removeClass( oldSize );
        this.$el.addClass( this.model.get('size') );
        this.trigger('resize');
      }
    })

  });

});