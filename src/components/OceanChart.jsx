// src/components/OceanChart.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const OceanChart = ({ chartData, width = "100%", height = 400 }) => {
  const renderChart = () => {
    switch (chartData.type) {
      case 'profile':
        return renderProfile(chartData);
      case 'ts':
        return renderTSDiagram(chartData);
      case 'hovmoller':
        return renderHovmoller(chartData);
      case 'map':
        return renderMap(chartData);
      case 'timeseries':
        return renderTimeSeries(chartData);
      default:
        return null;
    }
  };

  const renderProfile = (data) => {
    const traces = data.series.map((series, index) => ({
      x: series.points.map(p => p.x),
      y: series.points.map(p => p.y),
      mode: 'lines+markers',
      name: series.name,
      type: 'scatter',
      line: { width: 2 },
      marker: { size: 4 }
    }));

    return {
      data: traces,
      layout: {
        title: `Ocean ${data.x.charAt(0).toUpperCase() + data.x.slice(1)} Profile`,
        xaxis: { title: data.x.charAt(0).toUpperCase() + data.x.slice(1) },
        yaxis: { 
          title: data.y.charAt(0).toUpperCase() + data.y.slice(1),
          autorange: data.invertY ? 'reversed' : true 
        },
        showlegend: true,
        template: 'plotly_dark'
      }
    };
  };

  const renderTSDiagram = (data) => {
    const traces = data.series.map((series, index) => ({
      x: series.points.map(p => p.x),
      y: series.points.map(p => p.y),
      mode: 'markers',
      name: series.name,
      type: 'scatter',
      marker: { 
        size: 6,
        opacity: 0.7,
        colorscale: 'Viridis'
      }
    }));

    return {
      data: traces,
      layout: {
        title: 'Temperature-Salinity Diagram',
        xaxis: { title: 'Salinity (PSU)' },
        yaxis: { title: 'Temperature (°C)' },
        showlegend: true,
        template: 'plotly_dark'
      }
    };
  };

  const renderHovmoller = (data) => {
    return {
      data: [{
        z: data.grid.values,
        x: data.grid.t,
        y: data.grid.z,
        type: 'contour',
        colorscale: 'RdYlBu',
        contours: {
          coloring: 'heatmap'
        },
        colorbar: {
          title: data.z.charAt(0).toUpperCase() + data.z.slice(1)
        }
      }],
      layout: {
        title: `${data.z.charAt(0).toUpperCase() + data.z.slice(1)} Hovmöller Diagram`,
        xaxis: { title: 'Time' },
        yaxis: { 
          title: 'Depth (m)',
          autorange: 'reversed'
        },
        template: 'plotly_dark'
      }
    };
  };

  const renderMap = (data) => {
    const traces = [];
    
    // Add trajectory lines
    if (data.lines) {
      data.lines.forEach((line, index) => {
        traces.push({
          lon: line.path.map(p => p.lon),
          lat: line.path.map(p => p.lat),
          mode: 'lines',
          type: 'scattermapbox',
          name: `Float ${line.floatId}`,
          line: { width: 2 }
        });
      });
    }

    // Add waypoints
    if (data.points) {
      traces.push({
        lon: data.points.map(p => p.lon),
        lat: data.points.map(p => p.lat),
        mode: 'markers',
        type: 'scattermapbox',
        name: 'Float Positions',
        marker: { size: 8, color: 'red' },
        text: data.points.map(p => `Float ${p.floatId}<br>Time: ${p.time}`)
      });
    }

    return {
      data: traces,
      layout: {
        title: 'ARGO Float Trajectories',
        mapbox: {
          style: 'open-street-map',
          center: { lat: 0, lon: 0 },
          zoom: 2
        },
        showlegend: true,
        template: 'plotly_dark'
      }
    };
  };

  const renderTimeSeries = (data) => {
    const traces = data.series.map((series, index) => ({
      x: series.points.map(p => p.t),
      y: series.points.map(p => p.v),
      mode: 'lines+markers',
      name: series.name,
      type: 'scatter',
      line: { width: 2 }
    }));

    return {
      data: traces,
      layout: {
        title: `${data.metric.charAt(0).toUpperCase() + data.metric.slice(1)} Time Series`,
        xaxis: { title: 'Time' },
        yaxis: { title: `${data.metric} (${data.unit})` },
        showlegend: true,
        template: 'plotly_dark'
      }
    };
  };

  const plotConfig = renderChart();
  
  if (!plotConfig) {
    return <div className="text-center text-gray-400 p-8">Unsupported chart type</div>;
  }

  return (
    <div className="w-full bg-slate-800 rounded-lg overflow-hidden">
      <Plot
        data={plotConfig.data}
        layout={{
          ...plotConfig.layout,
          width: undefined,
          height: height,
          margin: { l: 50, r: 50, t: 50, b: 50 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { color: 'white' }
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['pan2d', 'lasso2d']
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default OceanChart;
