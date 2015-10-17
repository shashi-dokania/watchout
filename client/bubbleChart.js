(function(){
var dataSet = [{"country":"Australia","continent":"Oceania","population":22319.07,"GDPcap":40718.78167,"GERD":2.21367,"growth":2.48590317},
  {"country":"Austria","continent":"Europe","population":8427.318,"GDPcap":42118.46375,"GERD":2.74826,"growth":3.10741128},
  {"country":"Belgium","continent":"Europe","population":10590.44,"GDPcap":38809.66436,"GERD":1.96158,"growth":1.89308521},
  {"country":"Canada","continent":"America","population":33909.7,"GDPcap":39069.91407,"GERD":1.80213,"growth":3.21494841},
  {"country":"Chile","continent":"America","population":17248.45,"GDPcap":15106.73205,"GERD":0.39451,"growth":5.19813626},
  {"country":"Czech Republic","continent":"Europe","population":10286.3,"GDPcap":25956.76492,"GERD":1.52652,"growth":1.65489834},
  {"country":"Denmark","continent":"Europe","population":5495.246,"GDPcap":40169.83173,"GERD":3.01937,"growth":1.04974368},{"country":"Estonia","continent":"Europe","population":1335.347,"GDPcap":22403.02459,"GERD":1.44122,"growth":7.63563272},
  {"country":"Finland","continent":"Europe","population":5366.482,"GDPcap":37577.71225,"GERD":3.84137,"growth":2.85477157},
  {"country":"France","continent":"Europe","population":62747.78,"GDPcap":34147.98907,"GERD":2.20646,"growth":1.47996142},
  {"country":"Germany","continent":"Europe","population":82852.47,"GDPcap":39389.25874,"GERD":2.78056,"growth":2.99558644},
  {"country":"Greece","continent":"Europe","population":11312.16,"GDPcap":26878.00015,"GERD":0.5921,"growth":-6.90796403},
  {"country":"Hungary","continent":"Europe","population":9993.116,"GDPcap":21731.55484,"GERD":1.14821,"growth":1.69192342},
  {"country":"Iceland","continent":"Europe","population":308.038,"GDPcap":35641.55402,"GERD":2.64107,"growth":-3.99988322},
  {"country":"Ireland","continent":"Europe","population":4394.382,"GDPcap":40457.94273,"GERD":1.78988,"growth":-0.42935239},
  {"country":"Israel","continent":"Asia","population":7623.6,"GDPcap":28595.68799,"GERD":4.2504,"growth":4.84602001},
  {"country":"Italy","continent":"Europe","population":59059.66,"GDPcap":32580.06572,"GERD":1.26841,"growth":0.43108032}];


  var colorSet = {"Europe": 'green', "Oceania": 'teal', "America": 'red'};

  var chart = d3.select('.bubbleChart').append('svg:svg').attr('width', 700).attr('height', 300);

  chart.selectAll('circle').data(dataSet).enter()
    .append('circle')
    .attr('cx', function(d) {
      return d.GERD*80;
    })
    .attr('cy', function(d){
      return d.growth*50;
    })
    .attr('r', function(d){
      return Math.sqrt(d.population/4);
    })
    .style('background-color', 'green')
    .style('fill-opacity', 0.3)
    .style('fill', function(d){
      console.log(d.continent);
      return colorSet[d.continent];
    });

  }).call(this);