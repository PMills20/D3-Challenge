// 
var svgWidth = 900;
var svgHeight = 500

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG to hold the chart
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGRoup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//pull data 
//import
//var povData

d3.csv("data.csv", function(data, err) {
    if (err) throw err;
})
//grab numbers for poverty vs smokers 
povData.forEach(function(data) {
    data.smokes = +data.smokes;
    data.poverty = +data.poverty;
});
//Linear scale funtions
var xLinearScale = d3.scaleLinear()
    .range([0,width]);
var yLinearScale = d3.scaleLinear()
    .range([height,0]);

//axis functions 
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

var xMin;
var xMax;
var yMin;
var yMax;
  
  xMin = d3.min(povData, function(data) {
      return data.poverty;
  });
  
  xMax = d3.max(povData, function(data) {
      return data.poverty;
  });
  
  yMin = d3.min(povData, function(data) {
      return data.smokes;
  });
  
  yMax = d3.max(povData, function(data) {
      return data.smokes;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);
  console.log(xMin);
  console.log(yMax);

  //append x and y axis 
chartGroup.append("path")
.classed("line", true)
.attr("transform", `translate(0,${height})`)
.call(bottomAxis)

chartGroup.append("g")
.classed("axis", true)
.call(leftAxis);

//circles 
var circlesGroup = chartGroup.selectAll("circle")
.data(povData)
.enter()
.append("circle")
.attr("cx", d => xTimeScale(d.poverty))
.attr("cy", d => yLinearScale(d.smokes))
.attr("r", "10")
.attr("fill", "blue")
.attr("stroke-width", "1")
.on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
//tool tip 
var toolTip = d3.tip()
.attr("class", "tooltip")
.offset([80, -60])
.html(function(d) {
  return (abbr + '%');
  });
chartGroup.call(toolTip);

circlesGroup.on("click", function(data) {
    toolTip.show(data);
  })
//mouseout 
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

//create lables 
chartGroup.append("text")
.style("font-size", "12px")
.selectAll("tspan")
.data(povData)
.enter()
.append("tspan")
    .attr("x", function(data) {
        return xLinearScale(data.poverty +1.3);
    })
    .attr("y", function(data) {
        return yLinearScale(data.smokes +.1);
    })
    .text(function(data) {
        return data.abbr
    });

chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 50)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Poverty Level");

chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
  .attr("class", "axisText")
  .text("Smokes");



