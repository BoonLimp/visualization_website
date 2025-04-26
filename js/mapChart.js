// Set up dimensions
const width = 800;
const height = 500;

const svg = d3.select("#map-chart svg")
  .append("g");

// Define projection and path
const projection = d3.geoNaturalEarth1()
  .scale(160)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Create tooltip
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("background", "#fff")
  .style("padding", "8px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "4px")
  .style("pointer-events", "none");

// Load world map and developer data
Promise.all([
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
  d3.csv("data/developers_locations.csv")
]).then(([world, devs]) => {
  // Draw map
  svg.selectAll("path")
    .data(world.features)
    .enter()
    .append("path")
    .attr("fill", "#e0e0e0")
    .attr("d", path)
    .style("stroke", "#999");

  // Plot developer locations
  svg.selectAll("circle")
    .data(devs)
    .enter()
    .append("circle")
    .attr("cx", d => projection([+d.Longitude, +d.Latitude])[0])
    .attr("cy", d => projection([+d.Longitude, +d.Latitude])[1])
    .attr("r", 6)
    .attr("fill", "tomato")
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(`<strong>${d.Developer}</strong><br>Country: ${d.Country}<br>Lat: ${d.Latitude}, Lon: ${d.Longitude}`)
             .style("left", (event.pageX + 10) + "px")
             .style("top", (event.pageY - 30) + "px");
    })
    .on("mousemove", event => {
      tooltip.style("left", (event.pageX + 10) + "px")
             .style("top", (event.pageY - 30) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(300).style("opacity", 0);
    });
});
