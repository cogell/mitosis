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
      upVoteHandler: function(){
        var that = this;

        this.$el.addClass('animate');

        setTimeout(function(){
          that.$el.removeClass('animate');
        }, 1000);

        // this.el.addEventListener("animationend", this.upVoteAnimEnd, false);
      },
      upVoteAnimEnd: function(){
        console.log('comment animation is over');
        // this.$el.removeEventListener("animationiteration", upVoteAnimEnd);
        this.$el.removeClass('animate');
      }
    })

  });

});