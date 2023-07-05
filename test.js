d3.csv('input/datasc.csv', d3.autoType).then(data => {
  let count = 0;
  const nestedData = d3.groups(data, d => d.epoca);
  const processedData = nestedData.flatMap(([epoca, values]) => {
    return values.map((d, i) => {
      const globalIndex = count++;
      return {
        epoca,
        danceability: d.danceability,
        energy: d.energy,
        loudness_graph: 1 / Math.abs(d.loudness),
        loudness: d.loudness,
        duration: d.duration_ms,
        explicit: d.explicit === "TRUE" ? 1 : 0,
        image: `images/Frame${globalIndex + 1}.svg`,
      };
    });
  });

  const danceabilityPlot = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marks: [
      Plot.image(processedData, {
        x: 'danceability',
        y: 'epoca',
        width: 20,
        height: 20,
        src: d => d.image,
        title: d => d.danceability,
        tooltip: d => d.danceability,
      }),
    ],
    y: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: null,
      grid: true,
    },
    x: {
      label: null,
      domain: [0,1],
      tickFormat: d => {
        if (d === 0) return '0';
        if (d === 0.5) return '0.5';
        if (d === 1) return '1';
        return d3.format('.1f')(d);
      },
      ticks: [0, 0.5, 1],
    },
  });

  d3.select('#danceability1').append(() => danceabilityPlot);

  const energyPlot = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marks: [
      Plot.image(processedData, {
        x: 'energy',
        y: 'epoca',
        width: 20,
        height: 20,
        src: d => d.image,
        title: d => d.energy,
        tooltip: d => d.energy,
      }),
    ],
    y: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: null,
      grid: true,
    },
    x: {
      label: null,
      domain: [0,1],
      tickFormat: d => {
        if (d === 0) return '0';
        if (d === 0.5) return '0.5';
        if (d === 1) return '1';
        return d3.format('.1f')(d);
      },
      ticks: [0, 0.5, 1],
    },
  });

  d3.select('#energy1').append(() => energyPlot);

  const loudnessPlot = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marks: [
      Plot.image(processedData, {
        x: 'loudness',
        y: 'epoca',
        width: 20,
        height: 20,
        src: d => d.image,
        title: d => d.loudness,
        tooltip: d => d.loudness,
      }),
    ],
    y: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: null,
      grid: true,
    },
    x: {
      label: null,
      domain: [-12, -1],
      ticks: [-12, -1],
    },
  });

  d3.select('#loudness1').append(() => loudnessPlot);

  const durationPlot = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marks: [
      Plot.image(processedData, {
        x: d => d.duration / 60000,
        y: 'epoca',
        width: 20,
        height: 20,
        src: d => d.image,
        title: d => {
          const minutes = Math.floor(d.duration / 60000);
          const seconds = Math.floor((d.duration % 60000) / 1000);
          return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        tooltip: d => {
          const minutes = Math.floor(d.duration / 60000);
          const seconds = Math.floor((d.duration % 60000) / 1000);
          return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
      }),
    ],
    y: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: null,
      grid: true,
    },
    x: {
      label: null,
      domain: [1, 6],
      ticks: [1, 6],
      tickFormat: 'd',
    },
  });

  d3.select('#duration1').append(() => durationPlot);

  const explicitPlot = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
    marks: [
      Plot.image(processedData.filter(d => d.explicit > 0), {
        x: (d, i) => (i+1) * 15,
        y: 'epoca',
        width: 20,
        height: 20,
        src: d => d.image,
      }),
    ],
    y: {
      domain: ["70s", "80s", "90s", "2000s", "2010s", "2020s"],
      label: null,
      grid: true,
    },
    x: {
      label: null,
      axis: false,
      domain: [1, 160]
    },
  });
  
  d3.select('#explicit1').append(() => explicitPlot);
});
