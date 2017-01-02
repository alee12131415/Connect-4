// D3.js UI for connect 4

// Set width height
var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 410 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;

var xScale = d3.scale.ordinal()
    .domain(d3.range(0,7))
    .rangePoints([0, width]);

var yScale = d3.scale.ordinal()
    .domain(d3.range(0,6))
    .rangePoints([height,0]);

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

// Background
svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "darkblue");

svg.append("rect")
    .attr("width", width+44)
    .attr("height", height+44)
    .attr("transform", 
              "translate(8,8)")
    .attr("fill", "blue");

// Draw circles
function visual(d){
    console.log(d);
    svg.append("g")
        .selectAll("g")
        .data(d)
        .enter()
        .append("g")
        .selectAll("circle")
        .data(function(d,i,j) {return d;})
        .enter()
        .append("circle")
        .attr("cx", function(d,i,j) {
            return xScale(j);
            })
        .attr("cy", function(d,i,j) {
            return yScale(i);
            })
        .attr("r", 20)
        .attr("fill", function(d,i,j) {
            if(d==1){
                return "red";
            }
            if(d==2){
                return "yellow";
            }
            if(d==0){
                return "grey";
            }
            })
        .attr("transform", 
              "translate(30,30)");
    
}

// Helper functions