define(function(require){

  var App = require('app');
  require('Handlebars');
  require('d3');
  var _stats = require('text!apps/comments/show/templates/stats.html');

  return App.module('Comments.Show', function(Show){

    Show.Stats = Marionette.ItemView.extend({
      template: Handlebars.compile( _stats ),
      onShow: function(){
        this.initGlobals();
      },
      initGlobals: function(){
        this.margins = [5, 5, 5, 5];
        this.width = 150 - this.margins[1] - this.margins[3];
        this.height = 150 - this.margins[0] - this.margins[2];

        var m = this.margins;
        var w = this.width;
        var h = this.height;

        this.data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5];

        this.xScale = d3.scale.linear()
                        .domain([0, this.data.length])
                        .range([0, w]);

        this.yScale = d3.scale.linear()
                        .domain([0, 10])
                        .range([h, 0]);

        this.line = d3.svg.line()
                      .x(function(d,i){
                        return this.xScale(i);
                      })
                      .y(function(d){
                        return this.yScale(d);
                      });

        this.graphEl = this.$el.find('.graph');

        console.log('graph el is: ', this.graphEl[0]);

        this.graph = d3.select( this.graphEl[0] )
                      .append('svg:svg')
                        .attr('width', w+m[1]+m[3])
                        .attr('height', h+m[0]+m[2])
                      .append('svg:g')
                        .attr('transform', 'translate(' + m[3] + "," + m[0] + ")");

        this.xAxis = d3.svg.axis()
                        .scale(this.xScale)
                        .tickSize(-h)
                        .tickSubdivide(true);

        this.graph.append('svg:g')
                  .attr('class', 'x axis')
                  .attr('transform', 'translate(0,'+h+")")
                  .call(this.xAxis);

        this.yAxis = d3.svg.axis()
                        .scale(this.yScale)
                        .ticks(4)
                        .orient('left');

        this.graph.append('svg:g')
                  .attr('class', 'y axis')
                  .attr('transform', 'translate(-25,0)')
                  .call(this.yAxis);

        this.graph.append('svg:path').attr('d', this.line(this.data));
      }
    });

  });

});