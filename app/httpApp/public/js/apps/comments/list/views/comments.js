define(function(require){

  var App = require('app');
  var packeryPkg = require('packeryPkg');
  var Packery = require('packery');

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
        this.on('itemview:shrink', this.shrinkController, this);
        this.on('itemview:resize', this.resizeController, this);
      },
      onShow: function(){
        this.initPckry();
        this.on('after:item:added', this.appendItem, this);
      },
      appendItem: function(cv){
        this.pckry.appended( cv.$el[0] );
      },
      reflowPckry: function(){
        this.pckry.layout();
      },
      initPckry: function(){
        this.pckry = new Packery(this.$el[0], {
          itemSelector: '.comment',
          gutter: 0
        });
      },
      expandController: function(cv, msg){
        cv.$el.addClass('expanded');
        this.pckry.fit(cv.$el[0], 0, 0);
      },
      shrinkController: function(cv){
        cv.$el.removeClass('expanded');
        this.pckry.layout();

      },
      resizeController: function(cv){
        this.pckry.fit( cv.el );
      }
    })

  });

});