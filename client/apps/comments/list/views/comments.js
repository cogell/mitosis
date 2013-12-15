define(function(require){

  var App = require('app');
  require('apps/comments/show/views/comment');

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

        // Stubbing in interactions
        this.pruneLowComments();
        this.randomVotes();

        // Adding in tooltips
        this.toolHoverCount = 0;
        this.on('itemview:toolhovered', this.toolHovered, this);
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
          gutter: 1
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
      },

      // Stubbing in interactions
      pruneLowComments: function(){
        var that = this;
        setInterval(function(){
          var toRemove = that.collection.filter(function(model){
            return model.get('ups') == 0;
          });
          that.trigger('pruning', toRemove);
        }, 30000)
      },
      randomVotes: function(){
        var that = this;
        // set interval
        // choose a random model
        // trigger the vote method on that model
      },

      toolHovered: function(){
        console.log('this hover count ', this.toolHoverCount);
        if(this.toolHoverCount >= 8){
          this.children.each(function(cv){
            cv.trigger('hideToolTips');
          });
        } else {
          this.toolHoverCount ++;
        }
      }


    })

  });

});