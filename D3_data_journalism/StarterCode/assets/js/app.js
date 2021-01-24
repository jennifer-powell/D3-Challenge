// @TODO: YOUR CODE HERE!
// // You need to create a scatter plot between two of the data variables
// // such as `Healthcare vs. Poverty` or `Smokers vs. Age`.
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  var chosenXAxis = "obesity";
  var chosenYAxis = "poverty";
// Import Data
d3.csv("assets/data/data.csv").then(function(statedata) {

  statedata.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
  });
  var xLinearScale = d3.scaleLinear()
  .domain([20, d3.max(statedata, d => d.obesity)])
  .range([0, width]);

  var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(statedata, d => d.poverty)])
  .range([height, 0]);

//  Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

//  Append Axes to the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);

// Create Circles
chartGroup.selectAll("circle")
.data(statedata)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.obesity))
.attr("cy", d => yLinearScale(d.poverty))
.attr("r", "13")
.attr("fill", "green")
.attr("opacity", ".8")

chartGroup.selectAll("text")
.data(statedata)
.enter()
.append("text")
.text(d=>(d.abbr))
.attr("x", d => xLinearScale(d.obesity))
.attr("y", d => yLinearScale(d.poverty))
.attr("class", "text")
.attr("font-size", "9px")
.attr("text-anchor", "middle")
.attr("fill", "yellow");

//creating axis labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))// sub 0 to make sure it's going up
.attr("dy", "1em")
.attr("class", "axisText")
.text("Poverty");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("Obesity");
}).catch(function(error) {
console.log(error);




});
