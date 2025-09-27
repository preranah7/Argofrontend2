// src/components/BotResponseCard.jsx - Fixed steps to show in separate tab section
import React, { useState, useCallback } from 'react';
import {
  FaRobot,
  FaCopy,
  FaShareAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaBookmark,
  FaChevronDown,
  FaChevronUp,
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaExternalLinkAlt,
  FaExpand,
  FaDownload,
  FaTable,
  FaGlobe,
  FaListOl
} from 'react-icons/fa';
import OceanChart from './OceanChart';


// Generate all 5 types of oceanographic chart data
const generateOceanographicData = () => {
  const temperatureProfile = {
    type: "profile",
    x: "temperature",
    y: "depth",
    invertY: true,
    series: [
      {
        name: "Float 6903240",
        points: Array.from({ length: 50 }, (_, i) => ({
          x: 28 - (i * 0.4) + Math.random() * 2,
          y: i * 40 + Math.random() * 10
        }))
      },
      {
        name: "Float 6903241", 
        points: Array.from({ length: 45 }, (_, i) => ({
          x: 27.5 - (i * 0.38) + Math.random() * 1.8,
          y: i * 42 + Math.random() * 12
        }))
      }
    ]
  };

  const tsDiagram = {
    type: "ts",
    x: "salinity",
    y: "temperature", 
    series: [
      {
        name: "Surface Water",
        points: Array.from({ length: 80 }, () => ({
          x: 34.2 + Math.random() * 1.6,
          y: 20 + Math.random() * 8
        }))
      },
      {
        name: "Intermediate Water",
        points: Array.from({ length: 60 }, () => ({
          x: 34.4 + Math.random() * 1.2,
          y: 8 + Math.random() * 12
        }))
      }
    ]
  };

  const hovmoller = {
    type: "hovmoller",
    x: "time",
    y: "depth", 
    z: "temperature",
    grid: {
      t: Array.from({ length: 30 }, (_, i) => new Date(2024, 0, i + 1).toISOString()),
      z: Array.from({ length: 20 }, (_, i) => i * 100),
      values: Array.from({ length: 20 }, (_, depthIdx) => 
        Array.from({ length: 30 }, (_, timeIdx) => {
          const baseTemp = 25 - (depthIdx * 1.2);
          const seasonal = Math.sin((timeIdx / 30) * 2 * Math.PI) * 3;
          return baseTemp + seasonal + Math.random() * 2;
        })
      )
    },
    contour: true
  };

  const chlorophyllTimeSeries = {
    type: "timeseries",
    metric: "chlorophyll",
    unit: "mg m^-3",
    series: [
      {
        name: "Surface Chlorophyll",
        points: Array.from({ length: 50 }, (_, i) => ({
          t: new Date(2024, 0, i * 7).toISOString(),
          v: 0.2 + Math.sin((i / 50) * 4 * Math.PI) * 0.3 + Math.random() * 0.1
        }))
      }
    ]
  };

  const floatTrajectories = {
    type: "map",
    points: [
      { lon: -65.2, lat: 35.5, time: "2024-01-15", floatId: "6903240" },
      { lon: -64.8, lat: 35.3, time: "2024-01-20", floatId: "6903240" },
      { lon: -64.5, lat: 35.1, time: "2024-01-25", floatId: "6903240" }
    ],
    lines: [
      {
        floatId: "6903240",
        path: [
          { lon: -65.2, lat: 35.5 },
          { lon: -64.8, lat: 35.3 },
          { lon: -64.5, lat: 35.1 }
        ]
      }
    ]
  };

  return { temperatureProfile, tsDiagram, hovmoller, chlorophyllTimeSeries, floatTrajectories };
};

// Generate tabular data for charts
const generateTabularData = (chartData) => {
  switch (chartData.type) {
    case 'profile':
      return chartData.series.flatMap(series => 
        series.points.map((point, idx) => ({
          id: `${series.name}-${idx}`,
          float: series.name,
          [chartData.x]: point.x.toFixed(2),
          [chartData.y]: point.y.toFixed(1),
        }))
      );
    
    case 'ts':
      return chartData.series.flatMap(series =>
        series.points.map((point, idx) => ({
          id: `${series.name}-${idx}`,
          waterMass: series.name,
          salinity: point.x.toFixed(2),
          temperature: point.y.toFixed(1),
        }))
      );
    
    case 'hovmoller':
      return chartData.grid.t.flatMap((time, timeIdx) =>
        chartData.grid.z.map((depth, depthIdx) => ({
          id: `${timeIdx}-${depthIdx}`,
          date: new Date(time).toLocaleDateString(),
          depth: depth.toFixed(0) + 'm',
          temperature: chartData.grid.values[depthIdx][timeIdx].toFixed(2) + '°C'
        }))
      );
    
    case 'timeseries':
      return chartData.series.flatMap(series =>
        series.points.map((point, idx) => ({
          id: `${series.name}-${idx}`,
          parameter: series.name,
          date: new Date(point.t).toLocaleDateString(),
          value: point.v.toFixed(3),
          unit: chartData.unit
        }))
      );
    
    case 'map':
      return chartData.points.map((point, idx) => ({
        id: idx,
        floatId: point.floatId,
        longitude: point.lon.toFixed(3),
        latitude: point.lat.toFixed(3),
        timestamp: new Date(point.time).toLocaleDateString()
      }));
    
    default:
      return [];
  }
};

// Chart Dropdown Component
const ChartDropdown = React.memo(({ chartData, title, description, isActive, onClick, tabularData }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className={`border rounded-2xl transition-all duration-300 ${
      isActive ? 'border-cyan-500/50 bg-gray-800/90' : 'border-gray-700/50 bg-gray-800/50'
    } ring-1 ring-gray-600/30 hover:ring-cyan-500/30 shadow-xl backdrop-blur-sm overflow-hidden`}>
      <button
        onClick={onClick}
        className={`w-full p-6 text-left transition-colors duration-200 bg-transparent hover:bg-gray-700/30 ${
          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-xl ring-1 ring-cyan-500/30">
              {chartData.type === 'profile' && <FaChartLine className="w-5 h-5 text-cyan-400" />}
              {chartData.type === 'ts' && <FaChartBar className="w-5 h-5 text-cyan-400" />}
              {chartData.type === 'hovmoller' && <FaChartPie className="w-5 h-5 text-cyan-400" />}
              {chartData.type === 'timeseries' && <FaChartLine className="w-5 h-5 text-cyan-400" />}
              {chartData.type === 'map' && <FaGlobe className="w-5 h-5 text-cyan-400" />}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white group-hover:text-cyan-100 transition-colors duration-200">{title}</h4>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button 
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <FaExpand className="w-4 h-4" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <FaDownload className="w-4 h-4" />
              </button>
            </div>
            {isActive ? 
              <FaChevronUp className="text-cyan-400 text-lg transition-transform duration-200" /> : 
              <FaChevronDown className="text-gray-500 text-lg transition-transform duration-200" />
            }
          </div>
        </div>
      </button>

      {isActive && (
        <div className="border-t border-gray-700/50 bg-gradient-to-br from-gray-750/80 to-gray-800/80">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTable(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !showTable ? 'bg-cyan-600 text-white ring-1 ring-cyan-500/50' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 ring-1 ring-gray-600'
                  }`}
                >
                  <FaChartBar className="inline mr-2 text-xs" />
                  Chart View
                </button>
                <button
                  onClick={() => setShowTable(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    showTable ? 'bg-cyan-600 text-white ring-1 ring-cyan-500/50' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 ring-1 ring-gray-600'
                  }`}
                >
                  <FaTable className="inline mr-2 text-xs" />
                  Data Table
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white transition-all duration-200 ring-1 ring-gray-600/30 text-sm font-medium" title="Download data">
                  <FaDownload className="inline mr-2 text-xs" />
                  Export
                </button>
              </div>
            </div>

            {!showTable ? (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl border border-gray-700/50 overflow-hidden ring-1 ring-gray-600/20">
                <OceanChart chartData={chartData} height={450} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl border border-gray-700/50 overflow-hidden ring-1 ring-gray-600/20">
                <div className="max-h-96 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-800 sticky top-0">
                      <tr>
                        {tabularData.length > 0 && Object.keys(tabularData[0]).filter(key => key !== 'id').map(key => (
                          <th key={key} className="px-4 py-3 text-left text-gray-300 font-semibold capitalize border-b border-gray-700">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tabularData.slice(0, 100).map((row, idx) => (
                        <tr key={row.id || idx} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors duration-200">
                          {Object.keys(row).filter(key => key !== 'id').map(key => (
                            <td key={key} className="px-4 py-3 text-gray-200">
                              {row[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {tabularData.length > 100 && (
                    <div className="p-4 text-center text-gray-400 text-sm bg-gray-800/50">
                      Showing first 100 rows of {tabularData.length} total records
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

ChartDropdown.displayName = 'ChartDropdown';


const BotResponseCard = React.memo(({ response, selectedModel, onFeedback }) => {
  const [activeSection, setActiveSection] = useState('answer');
  const [feedback, setFeedback] = useState({ helpful: null, bookmarked: false });
  const [copied, setCopied] = useState(false);
  const [activeChart, setActiveChart] = useState(0);

  const { answer, sources = [], steps = [], visualizations = [] } = response || {};

  // Generate oceanographic data
  const oceanData = generateOceanographicData();
  
  const chartConfigs = [
    {
      data: oceanData.temperatureProfile,
      title: "Temperature Profile Analysis",
      description: "Vertical water column temperature analysis from ARGO float data",
      tabularData: generateTabularData(oceanData.temperatureProfile)
    },
    {
      data: oceanData.tsDiagram,
      title: "Temperature-Salinity Diagram",
      description: "Water mass identification through T-S relationships",
      tabularData: generateTabularData(oceanData.tsDiagram)
    },
    {
      data: oceanData.hovmoller,
      title: "Hovmöller Temperature Evolution",
      description: "Depth-time temperature evolution analysis",
      tabularData: generateTabularData(oceanData.hovmoller)
    },
    {
      data: oceanData.chlorophyllTimeSeries,
      title: "Chlorophyll Time Series",
      description: "Temporal variation of chlorophyll concentrations",
      tabularData: generateTabularData(oceanData.chlorophyllTimeSeries)
    },
    {
      data: oceanData.floatTrajectories,
      title: "ARGO Float Trajectories",
      description: "Geographic float positions and movement patterns",
      tabularData: generateTabularData(oceanData.floatTrajectories)
    }
  ];

  // Handle feedback actions
  const handleFeedback = useCallback((type, value) => {
    const newFeedback = { ...feedback };
    
    if (type === 'helpful') {
      newFeedback.helpful = feedback.helpful === value ? null : value;
    } else if (type === 'bookmark') {
      newFeedback.bookmarked = !newFeedback.bookmarked;
    }
    
    setFeedback(newFeedback);
    onFeedback?.(type, type === 'helpful' ? newFeedback.helpful : newFeedback.bookmarked);
  }, [feedback, onFeedback]);

  // Handle copy to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [answer]);

  // Handle share
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Response',
        text: answer,
      });
    } else {
      handleCopy();
    }
  }, [answer, handleCopy]);

  // Get chart icon based on type
  const getChartIcon = (type) => {
    switch (type) {
      case 'pie': return <FaChartPie className="w-5 h-5" />;
      case 'line': return <FaChartLine className="w-5 h-5" />;
      default: return <FaChartBar className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full bg-black rounded-xl shadow-xl border border-gray-700 overflow-hidden">
      {/* Header with AI Performance Pill */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-750 px-5 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-900/30 rounded-lg ring-1 ring-cyan-500/20">
              <FaRobot className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">AI Response</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="px-2 py-1 text-[10px] bg-emerald-900/30 text-emerald-400 rounded-full font-medium ring-1 ring-emerald-500/20">
                  ✓ Ready
                </span>
                <span className="px-2 py-1 text-[10px] bg-blue-900/30 text-blue-400 rounded-full font-medium ring-1 ring-blue-500/20">
                  {selectedModel || 'GPT'}
                </span>
                <span className="px-2 py-1 text-[10px] bg-purple-900/30 text-purple-400 rounded-full font-medium ring-1 ring-purple-500/20">
                  High Confidence
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 group relative ring-1 ring-gray-600 hover:ring-cyan-500/50"
              title="Copy response"
            >
              <FaCopy className={`w-3 h-3 transition-colors duration-200 drop-shadow-sm ${copied ? 'text-emerald-400' : 'text-gray-300 group-hover:text-white'}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 group ring-1 ring-gray-600 hover:ring-cyan-500/50"
              title="Share response"
            >
              <FaShareAlt className="w-3 h-3 text-gray-300 group-hover:text-white drop-shadow-sm" />
            </button>

            <button
              onClick={() => handleFeedback('helpful', true)}
              className={`p-2 rounded-lg transition-all duration-200 ring-1 ${
                feedback.helpful === true
                  ? 'bg-emerald-900/30 ring-emerald-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 ring-gray-600 hover:ring-emerald-500/50'
              }`}
              title="Helpful"
            >
              <FaThumbsUp className={`w-3 h-3 drop-shadow-sm ${
                feedback.helpful === true
                  ? 'text-emerald-400'
                  : 'text-gray-300 hover:text-emerald-400'
              }`} />
            </button>

            <button
              onClick={() => handleFeedback('helpful', false)}
              className={`p-2 rounded-lg transition-all duration-200 ring-1 ${
                feedback.helpful === false
                  ? 'bg-red-900/30 ring-red-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 ring-gray-600 hover:ring-red-500/50'
              }`}
              title="Not helpful"
            >
              <FaThumbsDown className={`w-3 h-3 drop-shadow-sm ${
                feedback.helpful === false
                  ? 'text-red-400'
                  : 'text-gray-300 hover:text-red-400'
              }`} />
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex items-center space-x-2 mt-3 flex-wrap gap-2">
          <button
            onClick={() => setActiveSection('answer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeSection === 'answer'
                ? 'bg-cyan-900/30 text-cyan-400 ring-1 ring-cyan-500/50'
                : 'bg-black text-white hover:text-white hover:bg-gray-700 ring-1 ring-gray-600'
            }`}
          >
            Answer
          </button>
          
          {sources?.length > 0 && (
            <button
              onClick={() => setActiveSection('sources')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeSection === 'sources'
                  ? 'bg-cyan-900/30 text-cyan-400 ring-1 ring-cyan-500/50'
                  : 'bg-black text-white hover:text-white hover:bg-gray-700 ring-1 ring-gray-600'
              }`}
            >
              Sources ({sources.length})
            </button>
          )}

          <button
            onClick={() => setActiveSection('visualizations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
              activeSection === 'visualizations'
                ? 'bg-cyan-900/30 text-cyan-400 ring-1 ring-cyan-500/50'
                : 'bg-black text-white hover:text-white hover:bg-gray-700 ring-1 ring-gray-600'
            }`}
          >
            <FaChartBar className="w-3 h-3" />
            <span>Analytics ({chartConfigs.length})</span>
          </button>

          {steps?.length > 0 && (
            <button
              onClick={() => setActiveSection('steps')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                activeSection === 'steps'
                  ? 'bg-cyan-900/30 text-cyan-400 ring-1 ring-cyan-500/50'
                  : 'bg-black text-white hover:text-white hover:bg-gray-700 ring-1 ring-gray-600'
              }`}
            >
              <FaListOl className="w-3 h-3" />
              <span>Steps ({steps.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* COMPLETE Content Sections */}
      <div className="p-5">
        {/* Answer Section */}
        {activeSection === 'answer' && (
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
              {answer || 'No response available.'}
            </div>
          </div>
        )}

        {/* Sources Section - COMPLETE */}
        {activeSection === 'sources' && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white mb-4 flex items-center space-x-2">
              <FaExternalLinkAlt className="w-4 h-4 text-cyan-400" />
              <span>Sources</span>
            </h4>
            {sources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sources.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 border border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group"
                  >
                    <FaExternalLinkAlt className="w-3 h-3 text-gray-400 group-hover:text-cyan-400 flex-shrink-0" />
                    <span className="text-xs text-gray-300 group-hover:text-white truncate">
                      {source}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No sources available.</p>
            )}
          </div>
        )}

        {/* Enhanced Visualizations Section with Dropdown Charts */}
        {activeSection === 'visualizations' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-white flex items-center space-x-3">
                <FaChartBar className="w-6 h-6 text-cyan-400" />
                <span>Data Analytics & Visualizations</span>
              </h4>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200 ring-1 ring-gray-600/30 text-sm font-medium">
                  Export All
                </button>
              </div>
            </div>
            
            {/* Interactive Chart Dropdowns */}
            <div className="space-y-6">
              {chartConfigs.map((config, index) => (
                <ChartDropdown
                  key={index}
                  chartData={config.data}
                  title={config.title}
                  description={config.description}
                  isActive={activeChart === index}
                  onClick={() => setActiveChart(activeChart === index ? -1 : index)}
                  tabularData={config.tabularData}
                />
              ))}
            </div>

            {/* Large Charts Grid - Existing placeholders */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
              {[1,2,3].map((_, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/90 to-gray-750/90 rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group ring-1 ring-gray-600/30 hover:ring-cyan-500/30 shadow-2xl backdrop-blur-sm"
                >
                  {/* Chart Header */}
                  <div className="p-6 bg-gradient-to-r from-gray-750/80 to-gray-800/80 border-b border-gray-700/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-xl ring-1 ring-cyan-500/30">
                          {getChartIcon(['bar', 'pie', 'line'][index])}
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-white group-hover:text-cyan-100 transition-colors duration-200">
                            {['Ocean Temperature Analysis', 'Data Source Distribution', 'Accuracy Trends'][index]}
                          </h5>
                          <span className="text-sm text-gray-400 capitalize font-medium">
                            {['Bar Chart', 'Pie Chart', 'Line Chart'][index]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                          <FaExpand className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50">
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {[
                        'Real-time ocean temperature data with depth analysis', 
                        'Distribution of data sources used in response generation',
                        'AI model accuracy improvement over time'
                      ][index]}
                    </p>
                  </div>

                  {/* Large Chart Content */}
                  <div className="p-6">
                    <div className="w-full h-80 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl border border-gray-700/50 flex items-center justify-center relative overflow-hidden ring-1 ring-gray-600/20">
                      {/* Chart placeholder with larger size */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="text-cyan-400 text-4xl">
                            {getChartIcon(['bar', 'pie', 'line'][index])}
                          </div>
                          <div>
                            <p className="text-gray-200 text-xl font-semibold mb-2">
                              {['Temperature Data', 'Source Analysis', 'Trend Analysis'][index]}
                            </p>
                            <p className="text-sm text-gray-500">
                              Interactive chart will render here
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full-width Sample Charts */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold text-gray-200">Live Oceanographic Data</h5>
                <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                  Updated in real-time
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-750/80 rounded-2xl p-8 border border-gray-700/50 ring-1 ring-gray-600/30 shadow-xl backdrop-blur-sm min-h-[500px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <FaChartLine className="text-6xl text-cyan-400 mx-auto" />
                    <div>
                      <p className="text-gray-200 text-2xl font-bold mb-2">Primary Oceanographic Chart</p>
                      <p className="text-gray-500">Real-time data visualization would render here</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-750/80 rounded-2xl p-8 border border-gray-700/50 ring-1 ring-gray-600/30 shadow-xl backdrop-blur-sm min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <FaChartBar className="text-5xl text-blue-400 mx-auto" />
                      <div>
                        <p className="text-gray-200 text-xl font-bold mb-2">Secondary Analysis</p>
                        <p className="text-gray-500">Chart placeholder</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-750/80 rounded-2xl p-8 border border-gray-700/50 ring-1 ring-gray-600/30 shadow-xl backdrop-blur-sm min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <FaChartPie className="text-5xl text-purple-400 mx-auto" />
                      <div>
                        <p className="text-gray-200 text-xl font-bold mb-2">Distribution Chart</p>
                        <p className="text-gray-500">Chart placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Steps Section - NOW AS SEPARATE TAB */}
        {activeSection === 'steps' && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <FaListOl className="w-6 h-6 text-cyan-400" />
              <span>Reasoning Steps</span>
            </h4>
            {steps.length > 0 ? (
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-750/50 rounded-xl border border-gray-700/50 ring-1 ring-gray-600/30">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 text-cyan-400 rounded-full flex items-center justify-center text-sm font-bold ring-1 ring-cyan-500/30">
                      {index + 1}
                    </span>
                    <div className="text-gray-300 leading-relaxed pt-1.5 text-sm">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaListOl className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-medium">No reasoning steps available for this response.</p>
                <p className="text-gray-500 text-sm mt-2">Steps will appear here when the AI provides detailed reasoning.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

BotResponseCard.displayName = 'BotResponseCard';

export default BotResponseCard;
