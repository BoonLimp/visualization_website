(function () {
    const margin = { top: 60, right: 30, bottom: 200, left: 80 },
          width = 1200 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#bar-chart svg")
      .append("g")
      .attr("transform", `translate(${margin.left + 60}, ${margin.top})`);
  
    d3.csv("data/top_selling_games.csv").then(data => {
      data.forEach(d => {
        d.Global_Sales = +d.Global_Sales;
      });
  
      const x = d3.scaleBand()
        .domain(data.map(d => d.Title))
        .range([0, width])
        .padding(0.2);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Global_Sales)])
        .range([height, 0]);
  
      const color = d3.scaleOrdinal(d3.schemeTableau10);
  
      // X Axis
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)")
        .style("font-size", "13px")
        .style("fill", "#fff");
  
      // X Axis Label
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 200)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#fff")
        .text("Game Titles");
  
      // Y Axis
      svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "13px")
        .style("fill", "#fff");
  
      // Y Label
      svg.append("text")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#fff")
        .text("Global Sales (Millions)");
  
      // Bars
      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Title))
        .attr("y", d => y(d.Global_Sales))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.Global_Sales))
        .attr("fill", d => color(d.Title))
        .append("title")
        .text(d => `${d.Title}: ${d.Global_Sales}M`);
    });
  })();
  
