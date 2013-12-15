define(function(require){

  var App = require('app');

  return App.module('Entities', function(Entities){

    Entities.Comment = Backbone.Model.extend({
      url: '/api/comments/',
      defaults: {
        'ups': 0
      },
      initialize: function(){
        this.setSize();
        this.on('upVote', this.upVoteHandler, this);
      },
      setSize: function(){

        var oldSize = this.get('size') || 'zero';

        var ups = this.get('ups');
        if (ups < 5){
          this.set('size', 'small');
        }
        else if (ups < 10){
          this.set('size', 'medium');
        }
        else if (ups < 50){
          this.set('size', 'large');
        }
        else if (ups < 10000000){
          this.set('size', 'big');
        }
        else {
          this.set('size', 'none');
        }

        if (oldSize !== this.get('size')){
          this.trigger('newSize', oldSize);
        }

      },
      upVoteHandler: function(){
        var currentVote = this.get('ups');
        var newVote = currentVote + 1;

        // TODO: authenticate up-vote
        // request current user from Auth app
        // check current user against model's vote map
          // if not on map
          // apply vote to model
          // save model to server
          // else
          // do nothing

        this.set('ups', newVote);
        this.setSize();

      }
    });

    Entities.Comments = Backbone.Collection.extend({
      model: Entities.Comment,
      comparator: function(m){
        return (-1) * m.get('ups');
      },
      url: function(){
        if (this.forId){
          return '/api/comments/for/' + this.forId
        }
      },
      initialize: function(options){
        this.forId = options.forId
      }

    });

    var API = {
      getCommentEntities: function(id){
        var comments = new Entities.Comments({forId: id});
        var defer = $.Deferred();

        comments.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(err){
            defer.resolve(undefined);
          }
        });

        return defer.promise();
      }
    };

    App.reqres.setHandler('entities:comments', function(id){
      return API.getCommentEntities(id);
    });

  });

});