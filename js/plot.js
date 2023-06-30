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
    width: 1500,
    height: 500,
    margin: 50,
    marginLeft: 60,
    marginRight: 40,
    marginBottom: 40,
    marks: [
      Plot.line(processedData, {
        x: 'epoca',
        y: 'danceability',
        stroke: '#545BFC',
        strokeWidth: 2,
        title: d => d.danceability,
        tooltip: d => d.danceability,
      }),
      Plot.text(processedData, {
        x: 'epoca',
        y: 'danceability',
        text: d => d.danceability.toFixed(2),
        textAnchor: 'middle',
        dy: -10,
        fill: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
      }),
      Plot.dot(processedData.filter((d, i) => i => 0 && d.danceability !== processedData[i - 1].danceability), {
        x: 'epoca',
        y: d => d.danceability,
        r: 4,
        fill: '#545BFC',
        title: d => d.danceability,
        tooltip: d => d.danceability,
      }),
    ],
    x: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: 'Época',
    },
    y: {
      axis: false,
    },
  });

  const energy = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marginLeft: 60,
    marginRight: 40,
    marginBottom: 40,
    marks: [
      Plot.line(processedData, {
        x: 'epoca',
        y: 'energy',
        stroke: '#545BFC',
        strokeWidth: 2,
        title: d => d.energy,
        tooltip: d => d.energy,
      }),
      Plot.text(processedData, {
        x: 'epoca',
        y: 'energy',
        text: d => d.energy.toFixed(2),
        textAnchor: 'middle',
        dy: -10,
        fill: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
      }),
      Plot.dot(processedData.filter((d, i) => i => 0 && d.energy !== processedData[i - 1].energy), {
        x: 'epoca',
        y: d => d.energy,
        r: 4,
        fill: '#545BFC',
        title: d => d.energy,
        tooltip: d => d.energy,
      }),
    ],
    x: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: 'Época',
    },
    y: {
      axis: false,
    },
  });

  const loudness = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marginLeft: 60,
    marginRight: 40,
    marginBottom: 40,
    marks: [
      Plot.line(processedData, {
        x: 'epoca',
        y: 'loudness',
        stroke: '#545BFC',
        strokeWidth: 2,
        title: d => d.loudness,
        tooltip: d => d.loudness,
      }),
      Plot.text(processedData, {
        x: 'epoca',
        y: 'loudness',
        text: d => d.loudness.toFixed(2),
        textAnchor: 'middle',
        dy: -10,
        fill: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
      }),
      Plot.dot(processedData.filter((d, i) => i => 0 && d.loudness !== processedData[i - 1].loudness), {
        x: 'epoca',
        y: d => d.loudness,
        r: 4,
        fill: '#545BFC',
        title: d => d.loudness,
        tooltip: d => d.loudness,
      }),
    ],
    x: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: 'Época',
    },
    y: {
      axis: false,
    },
  });

  const duration = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marginLeft: 60,
    marginRight: 40,
    marginBottom: 40,
    marks: [
      Plot.line(processedData, {
        x: 'epoca',
        y: d => d.duration / 60000,
        stroke: '#545BFC',
        strokeWidth: 2,
        title: d => d.duration / 60000,
        tooltip: d => d.duration / 60000,
      }),
      Plot.text(processedData, {
        x: 'epoca',
        y: d => d.duration / 60000,
        text: d => {
          const minutes = Math.floor(d.duration / 60000);
          const seconds = Math.floor((d.duration % 60000) / 1000);
          return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        textAnchor: 'middle',
        dy: -10,
        dx: 3,
        fill: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
      }),
      Plot.dot(processedData.filter((d, i) => i => 0 && d.duration !== processedData[i - 1].duration), {
        x: 'epoca',
        y: d => d.duration / 60000,
        r: 4,
        fill: '#545BFC',
        title: d => d.duration / 60000,
        tooltip: d => d.duration / 60000,
      }),
    ],
    x: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: 'Época',
    },
    y: {
      axis: false,
    },
  });

  const explicit = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marginLeft: 60,
    marginRight: 40,
    marginBottom: 40,
    marks: [
      Plot.line(processedData, {
        x: 'epoca',
        y: 'explicit',
        stroke: '#545BFC',
        strokeWidth: 2,
        title: d => d.explicit,
        tooltip: d => d.explicit,
      }),
      Plot.text(processedData, {
        x: 'epoca',
        y: 'explicit',
        text: d => d.explicit,
        textAnchor: 'middle',
        dy: -10,
        fill: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
      }),
      Plot.dot(processedData.filter((d, i) => i => 0 && d.explicit !== processedData[i - 1].explicit), {
        x: 'epoca',
        y: d => d.explicit,
        r: 4,
        fill: '#545BFC',
        title: d => d.explicit,
        tooltip: d => d.explicit,
      }),
    ],
    x: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: 'Época',
    },
    y: {
      axis: false,
    },
  });

  d3.select('#danceability').append(() => danceability);
  d3.select('#energy').append(() => energy);
  d3.select('#loudness').append(() => loudness);
  d3.select('#duration').append(() => duration);
  d3.select('#explicit').append(() => explicit);
});
