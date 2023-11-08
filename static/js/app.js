const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

const optionChanged = () => {
    d3.json(url).then(({ metadata, samples }) => {

        let choice = d3.select('select').node().value;

        let meta = metadata.find(obj => obj.id == choice);
        let sample = samples.find(obj => obj.id == choice);

        //Clear Demographic panel
        d3.select('.panel-body').html("");

        //append data to Demographic panel
        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
        });

        const { otu_ids, otu_labels, sample_values} = sample;

        console.log(sample_values);

        //Bar Chart
        var trace1 =
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(id =>`OTU ${id}`),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation:'h'
            }
          ;

          var barLayout = {
            title: "Top 10 Bacteria"
          }
          
          var barData = [trace1];

          Plotly.newPlot('bar', barData), barLayout;

          //Bubble Chart
          var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          };

          var bubbleLayout ={
            xaxis: {title: "OTU ID"}
          };
          
          var bubbleData = [trace2];
          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);

          //Gauge Chart
          var trace3 =
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta['wfreq'],
              title: { text: "<b>Belly Button Washing Frequency</b><br> Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 9] } }
            }
          ;
          
          var gaugeLayout = { width: 600, height: 400 };

          var gaugeData = [trace3]

          Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    })
};

//appending names: ids to option dropdown
d3.json(url).then(({ names }) => {
    names.forEach(id => {
        d3.select('select').append('option').text(id);
    });

    optionChanged()
})