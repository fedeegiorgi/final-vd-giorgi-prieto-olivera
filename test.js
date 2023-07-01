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
  
    const pmarks = []; // Initialize marks as an empty array
  
    pmarks.push(
      Plot.line(processedData, {
        x: 'epoca',
        y: d => d.energy,
        stroke: '#CCCCCC',
        strokeWidth: 2,
        title: d => d.energy,
        tooltip: d => d.energy,
      })
    );
  
    pmarks.push(
      Plot.line(processedData, {
        x: 'epoca',
        y: d => d.loudness_graph,
        stroke: '#CCCCCC',
        strokeWidth: 2,
        title: d => d.loudness,
        tooltip: d => d.loudness,
      })
    );
  
    pmarks.push(
      Plot.line(processedData, {
        x: 'epoca',
        y: d => d.duration / 60000,
        stroke: '#CCCCCC',
        strokeWidth: 2,
        title: d => d.duration / 60000,
        tooltip: d => d.duration / 60000,
      })
    );
  
    pmarks.push(
      Plot.line(processedData, {
        x: 'epoca',
        y: d => d.explicit,
        stroke: '#CCCCCC',
        strokeWidth: 2,
        title: d => d.explicit,
        tooltip: d => d.explicit,
      })
    );
  
    pmarks.push(
      Plot.line(processedData, {
        x: 'epoca',
        y: d => d.danceability,
        stroke: '#545BFC',
        strokeWidth: 2,
        title: d => d.danceability,
        tooltip: d => d.danceability,
      })
    );
  
    pmarks.push(
      Plot.dot(processedData.filter((d, i) => i >= 0 && d.danceability !== processedData[i - 1]?.danceability), {
        x: 'epoca',
        y: d => d.danceability,
        r: 4,
        fill: '#545BFC',
        title: d => d.danceability,
        tooltip: d => d.danceability,
      })
    );
  
    pmarks.push(
      Plot.text(processedData, {
        x: 'epoca',
        y: d => d.danceability,
        text: d => d.danceability,
        textAnchor: 'middle',
        dy: -10,
        fill: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
      })
    );
  
    const plot = Plot.plot({
      width: 3000,
      height: 1200,
      margin: 50,
      marginLeft: 60,
      marginRight: 40,
      marginBottom: 40,
      marks: pmarks,
      x: {
        domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
        label: '',
      },
      y: {
        axis: false,
      },
    });
  
    d3.select('#graph').append(() => plot);
  });
  