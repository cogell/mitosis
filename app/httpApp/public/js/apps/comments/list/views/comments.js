define(function(require){

  var App = require('app');
  var packeryPkg = require('packeryPkg');
  var Packery = require('packery');
  require('Handlebars');
  require('apps/comments/list/views/comment');
  // require('apps/comments/list/views/comment_layout');

  return App.module('Comments.List', function(List){

    List.Comments = Marionette.CollectionView.extend({
      // itemView: List.CommentLayout,
      itemView: List.Comment,

      itemViewContainer: '.packery-container',
      className: 'comments-container',

      // packery
      onShow: function(){
        this.pckryReload();
      },
      onAfterItemAdded: function(itemView){
        this.pckryReload();
        this.on('itemview:expandClicked', this.expandController);
      },
      pckryReload: function(){
        if (this.pckry){
          this.pckry.packery('reload');
        } else {
          this.initPckry();
        }
      },
      initPckry: function(){
        // console.log('this.$el', this.$el);
        this.pcky = new Packery(this.$el[0], {
          // options
          itemSelector: '.item',
          gutter: 0
        });
      },
      expandController: function(cv, msg){
        // expand the comment and make it fit inplace
      }
    })

  });

});