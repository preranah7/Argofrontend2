// src/components/HeroMap.jsx
import React, { useState, useEffect } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt, FaThermometerHalf, FaTint, FaCompass, FaWater } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Hero-optimized ARGO floats data with more variety
const heroFloats = [
  { id: "WMO-6903240", lat: 8.2, lng: 80.5, temp: "27.3°C", sal: "35.2 PSU", depth: "2000m", status: "Active" },
  { id: "WMO-6903241", lat: 12.8, lng: 85.2, temp: "28.1°C", sal: "34.8 PSU", depth: "1850m", status: "Active" },
  { id: "WMO-6903242", lat: 6.1, lng: 78.9, temp: "26.7°C", sal: "36.1 PSU", depth: "1950m", status: "Active" },
  { id: "WMO-6903243", lat: 10.5, lng: 90.3, temp: "29.2°C", sal: "35.0 PSU", depth: "2100m", status: "Active" },
  { id: "WMO-6903244", lat: -5.3, lng: 70.7, temp: "26.1°C", sal: "34.9 PSU", depth: "1900m", status: "Delayed" },
  { id: "WMO-6903245", lat: 15.2, lng: 88.1, temp: "30.1°C", sal: "34.5 PSU", depth: "1750m", status: "Active" },
  { id: "WMO-6903246", lat: 2.8, lng: 82.4, temp: "27.8°C", sal: "35.4 PSU", depth: "2050m", status: "Active" },
];

export default function HeroMap({ 
  heroMode = false, 
  height = "100%", 
  className = "" 
}) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoveredFloat, setHoveredFloat] = useState(null);

  // Create vibrant custom markers
  const createCustomIcon = (status, temp) => {
    const tempValue = parseFloat(temp.replace('°C', ''));
    let color = "#22d3ee"; // Default cyan
    let shadowColor = "rgba(34, 211, 238, 0.6)";
    
    if (tempValue > 28) {
      color = "#ef4444"; // Red for hot
      shadowColor = "rgba(239, 68, 68, 0.6)";
    } else if (tempValue > 26) {
      color = "#f59e0b"; // Orange for warm
      shadowColor = "rgba(245, 158, 11, 0.6)";
    } else if (tempValue < 24) {
      color = "#3b82f6"; // Blue for cool
      shadowColor = "rgba(59, 130, 246, 0.6)";
    }
    
    return L.divIcon({
      className: 'hero-marker',
      html: `
        <div class="marker-container">
          <div class="marker-dot" style="
            background-color: ${color}; 
            border: 3px solid white; 
            box-shadow: 0 0 30px ${shadowColor}, 0 0 60px ${shadowColor}40;
          "></div>
          <div class="marker-pulse" style="background-color: ${color};"></div>
        </div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  };

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Vibrant hero container */}
      <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/10 via-slate-900/20 to-black/30 backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
        
        {/* Enhanced loading state */}
        {!mapLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-cyan-300 text-sm font-medium">Loading ocean intelligence...</p>
            </div>
          </div>
        )}

        {/* Enhanced Leaflet Map */}
        <div className="w-full h-full relative">
          <LeafletMap
            center={[8, 82]}
            zoom={4}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            attributionControl={false}
            className="h-full w-full"
            style={{ 
              background: 'transparent',
              filter: 'contrast(1.3) brightness(1.1) saturate(1.2)' // Enhanced colors
            }}
            whenReady={() => setMapLoaded(true)}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
              opacity={0.9} // Increased opacity for vibrant look
              maxZoom={8}
            />

            {heroFloats.map((float) => (
              <Marker 
                key={float.id} 
                position={[float.lat, float.lng]}
                icon={createCustomIcon(float.status, float.temp)}
                eventHandlers={{
                  mouseover: () => setHoveredFloat(float.id),
                  mouseout: () => setHoveredFloat(null),
                }}
              >
                <Popup 
                  className="hero-popup" 
                  closeButton={false}
                  autoPan={false}
                  maxWidth={300}
                >
                  <div className="p-4 bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white rounded-xl border border-cyan-500/30 shadow-2xl">
                    {/* Enhanced float header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FaWater className="text-cyan-400 w-4 h-4" />
                        <h3 className="font-bold text-white">{float.id.split('-')[1]}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        float.status === "Active" 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30" 
                          : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30"
                      }`}>
                        {float.status}
                      </span>
                    </div>

                    {/* Enhanced ocean parameters */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg p-3 border border-red-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <FaThermometerHalf className="text-red-400 w-4 h-4" />
                          <span className="text-xs text-red-300 font-medium">Temperature</span>
                        </div>
                        <div className="font-bold text-white text-lg">{float.temp}</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-3 border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <FaTint className="text-blue-400 w-4 h-4" />
                          <span className="text-xs text-blue-300 font-medium">Salinity</span>
                        </div>
                        <div className="font-bold text-white text-lg">{float.sal}</div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg p-3 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCompass className="text-purple-400 w-4 h-4" />
                          <span className="text-xs text-purple-300 font-medium">Max Depth</span>
                        </div>
                        <div className="font-bold text-white text-lg">{float.depth}</div>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-lg p-3 border border-cyan-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <HiLocationMarker className="text-cyan-400 w-4 h-4" />
                          <span className="text-xs text-cyan-300 font-medium">Position</span>
                        </div>
                        <div className="font-bold text-white text-sm">{float.lat.toFixed(1)}°N, {float.lng.toFixed(1)}°E</div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LeafletMap>
        </div>

        {/* Enhanced floating legend */}
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-black/60 to-slate-900/60 backdrop-blur-lg rounded-xl px-4 py-3 border border-cyan-500/30 shadow-lg">
          <div className="flex items-center gap-4 text-sm text-white font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50 animate-pulse"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/50"></div>
              <span>Delayed</span>
            </div>
          </div>
        </div>

        {/* Enhanced live data indicator */}
        <div className="absolute bottom-4 left-4 z-10 bg-gradient-to-r from-emerald-600/80 to-green-600/80 backdrop-blur-lg rounded-xl px-4 py-3 border border-emerald-400/40 shadow-lg">
          <div className="flex items-center gap-3 text-sm text-white font-bold">
            <div className="w-3 h-3 bg-green-300 rounded-full animate-ping shadow-lg"></div>
            <span>LIVE • {heroFloats.filter(f => f.status === "Active").length} Active Floats</span>
          </div>
        </div>

        {/* Vibrant border glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/30 ring-inset pointer-events-none"
        />
      </div>

      {/* Enhanced custom styles */}
      <style jsx>{`
        .marker-container {
          position: relative;
          width: 18px;
          height: 18px;
        }
        .marker-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          z-index: 2;
          animation: marker-glow 2s ease-in-out infinite alternate;
        }
        .marker-pulse {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.6;
          animation: hero-pulse 2s infinite;
        }
        @keyframes hero-pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0.3; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes marker-glow {
          0% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
          100% { box-shadow: 0 0 30px currentColor, 0 0 60px currentColor; }
        }
        .hero-popup .leaflet-popup-content-wrapper {
          background: transparent;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          padding: 0;
          border: none;
        }
        .hero-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(34, 211, 238, 0.3);
        }
        .hero-popup .leaflet-popup-content {
          margin: 0;
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
