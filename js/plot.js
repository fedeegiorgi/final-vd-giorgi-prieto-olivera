let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let dataChart = [];
let $step;
let processedData;
let nestedData;

const scroller = scrollama();

function init() {
  setupStickyfill();

  $step = scrolly.selectAll(".step");

  scroller
  .setup({
    step: ".step",
    offset: 0.5,
    once: true,
  })
  .onStepEnter(handleStepEnter);

window.addEventListener("resize", scroller.resize);

  createChartDanceability();
  createChartEnergy();
  createChartLoudness();
  createChartDuration();
  createChartExplicit();

}

d3.csv('input/datasc.csv', d3.autoType).then(data => {
  nestedData = d3.groups(data, d => d.epoca);
  processedData = nestedData.map(([epoca, values]) => {
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
  init();
});


function handleStepEnter(response) {
  const { element } = response;
  const index = parseInt(d3.select(element).attr("data-step"));

  d3.selectAll(".step").classed("active", false);
  d3.select(element).classed("active", true);

  // Ocultar todos los gráficos al inicio
  d3.selectAll(".chart").style("opacity", 0);

  // Mostrar el gráfico actual con un retraso de 100ms
  const currentChartId = `#chart-${index}`;
  d3.select(currentChartId).style("opacity", 1);

  // Mostrar el gráfico actual como el gráfico fijo (fixed-chart)
  d3.select(currentChartId).classed("fixed-chart", true);

  // Restablecer el estado de los gráficos anteriores
  for (let i = 1; i < index; i++) {
    const previousChartId = `#chart-${i}`;
    d3.select(previousChartId)
      .style("opacity", 1) // Ajusta la opacidad a 0 para ocultar los gráficos anteriores
      .classed("fixed-chart", false);
  }
}




function handleStepExit(response) {
  // Restablecer el gráfico anterior cuando se desplaza hacia abajo
  const { element } = response;
  const index = parseInt(d3.select(element).attr("data-step"));

  if (index > 1) {
    const previousChartId = `#chart-${index - 1}`;
    d3.select(previousChartId).classed("fixed-chart", false);
  }
}



function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}



function handleStepProgress(response) {
  console.log(response);
  $figure.style("opacity", response.progress);
  $step = d3.select(response.element);
  console.log($step.attr("data-step"));

}

function createChartDanceability() {
  const danceability = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
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
      label: '',
      
    },
    y: {
      axis: false,
    },
  });  
 
  
  // d3.select("#scrolly figure svg").remove();
  // d3.select("#scrolly figure").append(() => danceability);
  d3.select('#danceability').append(() => danceability);
}

function createChartEnergy() {
  const energy = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
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
      label: '',
    },
    y: {
      axis: false,
    },
  });

  // d3.select("#scrolly figure svg").remove();
  d3.select('#energy').append(() => energy);
}

function createChartLoudness() {
  const loudness = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
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
      label: '',
    },
    y: {
      axis: false,
    },
  });
  // d3.select("#scrolly figure svg").remove();
  d3.select('#loudness').append(() => loudness);
}

function createChartDuration() {
  const duration = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
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
      label: '',
    },
    y: {
      axis: false,
    },
  });

  // d3.select("#scrolly figure svg").remove();
  d3.select('#duration').append(() => duration);
}

function createChartExplicit() {
  const explicit = Plot.plot({
    width: 1500,
    height: 500,
    margin: 50,
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
      label: '',
    },
    y: {
      axis: false,
    },
  });

  // d3.select("#scrolly figure svg").remove();
  d3.select('#explicit').append(() => explicit);
}

init();
