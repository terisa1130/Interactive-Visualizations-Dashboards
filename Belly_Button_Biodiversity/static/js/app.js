function buildMetadata(sample) {
    // @TODO: Complete the following function that builds the metadata panel
  
    /* Use `d3.json` to fetch the metadata for a sample
       Use d3 to select the panel with id of `#sample-metadata`
       @app.route("/metadata/<sample>") Line 52
    */ 
      var sampleJson =d3.json(`/metadata/${sample}`).then((data) => {

        var sampleMetadata= d3.select ("#sample-metadata");   // HTML -div id="sample-metadata" Line 31
        console.log(sampleJson);  
      
      // Use `.html("") to clear any existing metadata
        sampleMetadata.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      //NOTE: iterating through an Object then append output as paragraphs 
        Object.entries(sample).forEach(([key,value]) => {
            sampleMetadata.append("h3").text(`${key}:${value}`) // HTML -div id="sample-metadata" Line 29
       });

      });
  
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  
  
  function buildCharts(sample) {
        /* @TODO: Use `d3.json` to fetch the sample data for the plots
        """Return `otu_ids`, `otu_labels`,and `sample_values`."""
        */
      d3.json(`/samples/${sample}`).then((sampleData) => {

        //another option: Global variables: 
        // var xAxis = data.otu_ids;
        // var yAxis = data.sample_values;
        // var labels = data.otu_labels;

       
        var trace1 =[{
            x: sampleData.otu_ids,
            y: sampleData_values,
            labels: sampleData.out_labels,
            mode: "markers",
            marker: {
                size: sampleData_values,
                color: sampleData.otu_ids,
                colorscale: "Viridis",}
        }]
  });



      //apply the group bubble mode to the layout
      var layoutBubble ={
        title: "Belly Button Bacteria",
        height: 600, 
        width:1400,};

      // @TODO: Build a Bubble Chart using the sample data
      Plotly.newPlot("bubble", trace1, layoutBubble);


  
  
      // @TODO: Build a Pie Chart
      var topTen =sampleData.sample_values.slice(0,10);
      var tenLabes =sampleData.otu_ids.slice(0,10);
      var tenText =sampleData.out_labels.slice(0,10);
      var trace2 =[{
          values: topTen, 
          lables: tenLabels,
          hovertext: tenText,
          hole: .4,
          type: 'pie'
      }]

      var layoutPie ={
          height:400,
          width:500
      }

      Plotly.newPlot("pie", trace2, layoutPie);

  
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  }
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();