import React from "react";

export default function Floats() {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold py-4 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Explore BGC-Argo Map
      </h1>

      <iframe
        src="https://maps.biogeochemical-argo.com/bgcargo/"
        width="100%"
        height="100%"
        style={{ border: "none", display: "block" }}
        title="BGC-Argo Map"
      ></iframe>
    </div>
  );
}