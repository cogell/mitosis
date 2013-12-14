define(function(require){

  var App = require('app');
  var packeryPkg = require('packeryPkg');
  var Packery = require('packery');
  // require('Handlebars');
  // require('apps/comments/list/views/comment');
  // require('apps/comments/list/views/comment_layout');

  return App.module('Comments.List', function(List){

    List.Comments = Marionette.CollectionView.extend({
      // itemView: List.CommentLayout,
      itemView: App.Comments.Show.Comment,

      // override the collectionview buildItemView function to call out to the App for proper comment creation
      buildItemView: function(item, ItemViewType, itemViewOptions){
        // note options are not getting properly attached to the itemview see marionette source for buildItemView
        var view = App.request('comment:show', item);
        return view;
      },

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