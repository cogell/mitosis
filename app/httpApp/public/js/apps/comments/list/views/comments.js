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

      initialize: function(){
        this.on('itemview:expand', this.expandController, this);
      },
      // packery
      onShow: function(){
        this.initPckry();
        this.on('afterItemAdded', this.reflowPckry);
      },
      reflowPckry: function(){
        this.pckry.layout();
      },
      pckryFit: function(cv){
        this.pckry.fit( cv.$el[0], 0, 0 );
        // this.pckry.layoutItems( cv.$el[0] );
      },
      initPckry: function(){
        this.pckry = new Packery(this.$el[0], {
          itemSelector: '.comment',
          gutter: 0
        });

        // debug
        window.pckry = this.pckry;
      },
      expandController: function(cv, msg){
        // expand the comment and make it fit inplace
        cv.$el.addClass('expanded');
        this.pckryFit(cv);
      }
    })

  });

});