d3.csv('input/datasc.csv', d3.autoType).then(data => {
    const nestedData = d3.groups(data, d => d.epoca);
    const processedData = nestedData.map(([epoca, values]) => {
      return {
        epoca,
        danceability: d3.mean(values, d => +d.danceability),
        energy: d3.mean(values, d => +d.energy),
        loudness_graph: d3.mean(values, d => +1 / Math.abs(d.loudness)),
        loudness: d3.mean(values, d => +d.loudness),
        duration: d3.mean(values, d => +d.duration_ms),
        explicit: d3.sum(values, d => d.explicit === "TRUE"),
      };
    });
  
    const danceability = Plot.plot({
      width: 400,
      height: 500,
      margin: 50,
      marginLeft: 60,
      marginRight: 40,
      marginBottom: 40,
      y: {
        grid: false,
        axis: false,
      },
      marks: [
        Plot.barY(processedData, {
          x: 'epoca',
          y: d => d.danceability,
          fill: '#545BFC',
          stroke: 'black',
          title: d => d.danceability,
          tooltip: d => d.danceability,
        }),
        Plot.text(processedData, {
          x: 'epoca',
          y: d => d.danceability,
          text: d => d.danceability.toFixed(2), // Modify the accessor for the text label
          dy: -10,
          dx: 0,
          align: 'center',
          fontWeight: 'bold',
          fontSize: 14,
        }),
      ],
      x: {
        domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
        label: '',
        tickSize: 0,
        fontSize: 0,
      },
    });
  
    const energy = Plot.plot({
      width: 400,
      height: 500,
      margin: 50,
      marginLeft: 60,
      marginRight: 40,
      marginBottom: 40,
      y: {
        grid: false,
        axis: false,
      },
      marks: [
        Plot.barY(processedData, {
          x: 'epoca',
          y: d => d.energy,
          fill: '#05FF00',
          stroke: 'black',
          title: d => d.energy,
          tooltip: d => d.energy,
        }),
        Plot.text(processedData, {
          x: 'epoca',
          y: d => d.energy,
          text: d => d.energy.toFixed(2), // Modify the accessor for the text label
          dy: -10,
          dx: 0,
          align: 'center',
          fontWeight: 'bold',
          fontSize: 14,
        }),
      ],
      x: {
        domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
        label: '',
        tickSize: 0,
        fontSize: 0,
      },
    });

    const loudness = Plot.plot({
        width: 400,
        height: 500,
        margin: 50,
        marginLeft: 60,
        marginRight: 40,
        marginBottom: 40,
        y: {
          grid: false,
          axis: false,
        },
        marks: [
          Plot.barY(processedData, {
            x: 'epoca',
            y: d => d.loudness_graph,
            fill: '#FFF620',
            stroke: 'black',
            title: d => d.loudness,
            tooltip: d => d.loudness,
          }),
          Plot.text(processedData, {
            x: 'epoca',
            y: d => d.loudness_graph, // Adjust the position of the text label
            text: d => d.loudness.toFixed(2), // Format the text label
            dy: -10,
            dx: -1,
            align: 'middle',
            fontWeight: 'bold',
            fontSize: 14,
          }),
        ],
        x: {
          domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
          label: '',
          tickSize: 0,
          fontSize: 0,
        },
      });

      const duration = Plot.plot({
        width: 400,
        height: 500,
        margin: 50,
        marginLeft: 60,
        marginRight: 40,
        marginBottom: 40,
        y: {
          grid: false,
          axis: false,
        },
        marks: [
          Plot.barY(processedData, {
            x: 'epoca',
            y: d => d.duration / 60000,
            fill: '#FF6B00',
            stroke: 'black',
            title: d => d.duration / 60000,
            tooltip: d => d.duration / 60000,
          }),
          Plot.text(processedData, {
            x: 'epoca',
            y: d => d.duration / 60000, // Adjust the position of the text label
            text: d => {
              const minutes = Math.floor(d.duration / 60000);
              const seconds = Math.floor((d.duration % 60000) / 1000);
              return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            },
            dy: -10,
            dx: -1,
            align: 'middle',
            fontWeight: 'bold',
            fontSize: 14,
          }),
        ],
        x: {
          domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
          label: '',
          tickSize: 0,
          fontSize: 0,
        },
      });

      const explicit = Plot.plot({
        width: 400,
        height: 500,
        margin: 50,
        marginLeft: 60,
        marginRight: 40,
        marginBottom: 40,
        y: {
          grid: false,
          axis: false,
        },
        marks: [
          Plot.barY(processedData, {
            x: 'epoca',
            y: d => d.explicit,
            fill: '#F41B1B',
            stroke: 'black',
            strokeWidth: 1.3,
            title: d => d.explicit,
            tooltip: d => d.explicit,
          }),
          Plot.text(processedData, {
            x: 'epoca',
            y: d => d.explicit,
            text: d => d.explicit.toFixed(0), // Modify the accessor for the text label
            dy: -10,
            dx: 0,
            align: 'center',
            fontWeight: 'bold',
            fontSize: 14,
          }),
        ],
        x: {
          domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
          label: '',
          tickSize: 0,
          fontSize: 0,
        },
      });
    d3.select('#danceability').append(() => danceability);
    d3.select('#energy').append(() => energy);
    d3.select('#loudness').append(() => loudness);
    d3.select('#duration').append(() => duration);
    d3.select('#explicit').append(() => explicit);
  });