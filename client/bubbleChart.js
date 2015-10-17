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
  {"country":"Italy","continent":"Europe","population":59059.66,"GDPcap":32580.06572,"GERD":1.26841,"growth":0.43108032},
  {"country":"Japan","continent":"Asia","population":126912.8,"GDPcap":33751.23348,"GERD":3.33499,"growth":3.96559062},
  {"country":"Korea","continent":"Asia","population":48988.83,"GDPcap":29101.34563,"GERD":3.3609,"growth":6.16184325},
  {"country":"Luxembourg","continent":"Europe","population":483.701,"GDPcap":86226.3276,"GERD":1.67862,"growth":2.67806902},
  {"country":"Mexico","continent":"America","population":109219.9,"GDPcap":15200.22119,"GERD":0.41322,"growth":5.56185685},
  {"country":"Netherlands","continent":"Europe","population":16480.79,"GDPcap":43455.30129,"GERD":1.81965,"growth":1.18517739},
  {"country":"New Zealand","continent":"Oceania","population":4291.9,"GDPcap":29870.67748,"GERD":1.13693,"growth":2.33052515},
  {"country":"Norway","continent":"Europe","population":4789.628,"GDPcap":57230.89,"GERD":1.75922,"growth":1.59773989},
  {"country":"Poland","continent":"Europe","population":37725.21,"GDPcap":19882.99226,"GERD":0.67502,"growth":4.34962928},
  {"country":"Portugal","continent":"Europe","population":10684.97,"GDPcap":25425.59561,"GERD":1.65519,"growth":-1.60958484},
  {"country":"Russian Federation","continent":"Europe","population":142822.5,"GDPcap":19833,"GERD":1.24252,"growth":4.03428262},
  {"country":"Slovak Republic","continent":"Europe","population":5404.493,"GDPcap":24429.61828,"GERD":0.48056,"growth":3.34920254},
  {"country":"Slovenia","continent":"Europe","population":2029.418,"GDPcap":27559.75186,"GERD":1.85642,"growth":-0.17459255},
  {"country":"South Africa","continent":"Africa","population":50384.55,"GDPcap":10497.583,"GERD":0.92523,"growth":2.784},
  {"country":"Spain","continent":"Europe","population":44835.48,"GDPcap":32779.3288,"GERD":1.38357,"growth":-0.06947685},
  {"country":"Sweden","continent":"Europe","population":9276.365,"GDPcap":41526.2995,"GERD":3.61562,"growth":3.93555895},
  {"country":"Switzerland","continent":"Europe","population":7889.345,"GDPcap":46621.77334,"GERD":2.99525,"growth":2.71404473},
  {"country":"Turkey","continent":"Europe","population":73497,"GDPcap":15666.18783,"GERD":0.84902,"growth":9.00558548},
  {"country":"United Kingdom","continent":"Europe","population":62761.35,"GDPcap":35715.4691,"GERD":1.82434,"growth":2.09209263},
  {"country":"United States","continent":"America","population":313232,"GDPcap":46587.61843,"GERD":2.78518,"growth":3.02171711}];


  var colorSet = {"Europe": 'green', "Oceania": 'teal', "America": 'red', "Asia": 'blue', "Africa": 'orange'};
  var populations = [];
  var growthNums = [];
  var GERDNums = [];
  var GDParray = [];
  for(var i = 0; i < dataSet.length; i++){  
    for(var key in dataSet[i]){
      if(key === 'population'){
        populations.push(dataSet[i][key]);
      } else if(key === 'GERD'){
        GERDNums.push(dataSet[i][key]);
      } else if(key === 'growth'){
        growthNums.push(dataSet[i][key]);
      } else if(key ==='GDPcap'){
        GDParray.push(dataSet[i][key]);
      }
    }
  }

  var highestPopulation = d3.max(populations);
  var linearPopulationScale = d3.scale.linear().domain([0, highestPopulation]).range([0, 100]);

  var highestGrowth = d3.max(growthNums);
  var lowestGrowth = d3.min(growthNums);
  var linearGrowthScale = d3.scale.linear().domain([lowestGrowth - 1, highestGrowth]).range([0, 400]);

  var highestGERD = d3.max(GERDNums);
  var lowestGERD = d3.min(GERDNums);
  var linearGERDScale = d3.scale.linear().domain([lowestGERD - 1, highestGERD]).range([0, 700]);

  var highestGDP = d3.max(GDParray);
  var linearGDPScale = d3.scale.linear().domain([0, highestGDP]).range([0,100]);

  var chart = d3.select('.bubbleChart').append('svg:svg').attr('width', 800).attr('height', 450);

  d3.select('.reGraphButton')
    .on('click', function(){
      chart.selectAll('circle').data(dataSet)
        .transition().duration(1000)
        .attr('r', function(d){
          return linearGDPScale(d.GDPcap);
        });      
    });

    d3.select('.reGraphButtonPop')
    .on('click', function(){
      chart.selectAll('circle').data(dataSet)
        .transition().duration(1000)
        .attr('r', function(d){
          return linearPopulationScale(d.population);
        });      
    });

var GERDisX = true;
    d3.select('.flipGraphButtonPop')
    .on('click', function(){
      var newXAxis;
      var newYAxis;
      var newXMeasure;
      var newYMeasure;
      if(GERDisX){
        newYAxis = d3.scale.linear().domain([lowestGERD, highestGERD]).range([0, 400]);
        newXAxis = d3.scale.linear().domain([lowestGrowth, highestGrowth]).range([0, 700]);
      } else {
        newYAxis = d3.scale.linear().domain([lowestGrowth, highestGrowth]).range([0, 400]);
        newXAxis = d3.scale.linear().domain([lowestGERD, highestGERD]).range([0, 700]);
      }

      chart.selectAll('circle').data(dataSet)
        .transition().duration(1000)
        .attr('cx', function(d){
          
          if(GERDisX){
            GERDisX = !GERDisX;
            return newXAxis(d.growth);
          } else {
            GERDisX = !GERDisX;
            return newXAxis(d.GERD);
          }
        })
        .attr('cy', function(d){
          if(!GERDisX){
            GERDisX = !GERDisX;
            return newYAxis(d.GERD);
          } else {
            GERDisX = !GERDisX;
            return newYAxis(d.growth);
          }
        });      
    });

  chart.selectAll('circle').data(dataSet).enter()
    .append('circle')
    .attr('cx', function(d) {
      return 0;
    })
    .attr('cy', function(d){
      return 0;
    })
    .attr('r', function(d){
      return 1;
    })
    .on('mouseover', function(d){
      d3.select('.infoDisplay')
        .style('visibility', 'visible')
        .text(d.country);
    })
    .on('mouseout', function(d){
      d3.select('.infoDisplay').style('visibility', 'hidden');
      d3.select('.infoDisplay').text("");
    })
    .style('background-color', 'green')
    .style('fill-opacity', 0.3)
    .style('fill', function(d){
      return colorSet[d.continent];
    });

    chart.selectAll('circle').data(dataSet).transition().duration(1000)
    .ease('elastic')
    .attr('cx', function(d) {
      return linearGERDScale(d.GERD);
    })
    .attr('cy', function(d){
      return 0;
      //return linearGrowthScale(d.growth);
    })
    .attr('r', function(d){
      return linearPopulationScale(d.population);
    });

    chart.selectAll('circle').data(dataSet).transition().duration(1000)
    .delay(1000)
    .attr('cy', function(d){
      return linearGrowthScale(d.growth);
    })
    .attr('r', function(d){
      return linearPopulationScale(d.population);
    });

  }).call(this);