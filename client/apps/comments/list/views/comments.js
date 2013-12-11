define(function(require){

  var App = require('app');
  var packeryPkg = require('packeryPkg');
  var Packery = require('packery');
  require('Handlebars');
  require('apps/comments/list/views/comment');

  return App.module('Comments.List', function(List){

    List.Comments = Marionette.CollectionView.extend({
      itemView: List.Comment,
      itemViewContainer: '.packery-container',
      className: 'comments-container',
      onShow: function(){
        this.pckryReload();
      },
      onAfterItemAdded: function(itemView){
        this.pckryReload();
      },
      pckryReload: function(){
        console.log('test');
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
      }
    })

  });

});