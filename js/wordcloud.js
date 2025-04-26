(function () {
    const width = 800;
    const height = 500;
  
    const svg = d3.select("#word-cloud svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    d3.csv("data/wordcloud_data.csv").then(data => {
      data.forEach(d => {
        d.size = +d.size;
      });
  
      const layout = d3.layout.cloud()
        .size([width, height])
        .words(data.map(d => ({ text: d.text, size: d.size * 8 })))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .fontSize(d => d.size)
        .on("end", draw);
  
      layout.start();
  
      function draw(words) {
        svg.selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", d => d.size + "px")
          .style("fill", () => d3.schemeTableau10[Math.floor(Math.random() * 10)])
          .attr("text-anchor", "middle")
          .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
          .text(d => d.text);
      }
    });
  })();
  