define(function(require){

  require('Handlebars');
  require('d3');
  require('topojson');

  var App = require('app');
  var _stats = require('text!apps/comments/list/templates/map.html');

  return App.module('Comments.List', function(List){

    List.Map = Marionette.ItemView.extend({
      template: Handlebars.compile( _stats ),
      className: 'map-view',
      events: {
        'click .js-close': 'closeClicked'
      },
      onShow: function(){
        this.getData();
        this.setWindowResize();
      },
      closeClicked: function(e){
        e.preventDefault();
        this.trigger('close');
      },
      getData: function(){
        var that = this;

        // async call, must happen when dom el ready
        d3.json('/map/world_sans_anartica.json', function(err, data){
          // handle error here

          // on success
          world = data;
          that.renderData( world );
        });

      },
      renderData: function( world ){
        var that = this;

        this.map = d3.select( this.$el[0] ).append('svg');
        this.worldGroup = this.map.append('g');

        // return compressed data back to GeoJSON
        var whole_world = topojson.feature(world, world.objects.geo_world);

        // create a projection generator
        var projection = d3.geo.mercator();

        // create a path generator
        var path = d3.geo.path().projection( projection );

        // draw the paths with the world data
        this.worldGroup.append('path')
            // data set
            .datum( whole_world )
            // set 'd' to the path
            .attr('d', path);

        // retrive all the continent names from the data
        var continents = topojson.feature(world, world.objects.geo_world).features

        // adding feature named classes to the paths
        this.worldGroup.selectAll('.region')
          .data( continents )
          .enter().append('path')
          .attr('class', function(d){
            var str = String(d.properties.continent);
            conditioned_str = str.toLowerCase(); // make continent name all lower case
            conditioned_str = conditioned_str.replace(/ /g, ''); // remove all whitespaces
            return 'region ' + conditioned_str
          })
          .attr('d', path);

        this.setUIHandlers();
        this.onWindowResize();
      },
      setUIHandlers: function(){
        var that = this;

        this.worldGroup.selectAll('.region')
            .on('mouseover', function(d,i){
              this.classList.add('hover');
            })
            .on('mouseout', function(d,i){
              this.classList.remove('hover');
            });
      },
      setWindowResize: function(){
        var that = this;
        $(window).resize(function(){
          that.onWindowResize();
        });
      },
      onWindowResize: function(){
        var scale = parseInt( $(window).width()/2 );
        d3.select('g').attr( 'transform', 'scale(' + scale/500 + ')' );
      }

    });

  });

});