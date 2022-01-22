import React from "react";
import { Map } from "react-leaflet";
import L from "leaflet";
import { ImageOverlay } from "react-leaflet";

import HeatmapLayer from "react-leaflet-heatmap-layer";
import heatmapData from "./data/heatmap_data";

import "leaflet/dist/leaflet.css";
import "./heatmap.css";

const floorBounds = [
  [0, 0],
  [600, 900],
];

const gradientHeatmap = { 0.3: "green", 0.4: "yellow", 1.0: "red" };

function App() {
  return (
    <div className="App">
      <Map
        id={"map"}
        crs={L.CRS.Simple}
        bounds={floorBounds}
        maxBounds={floorBounds}
        zoom={0}
        maxZoom={3}
        scrollWheelZoom={true}
      >
        <ImageOverlay
          url={require("./FloorPlan.jpg")}
          center={[300, 450]}
          bounds={floorBounds}
        />
        <HeatmapLayer
          points={heatmapData}
          latitudeExtractor={(m) => parseInt(m[0])}
          longitudeExtractor={(m) => parseInt(m[1])}
          intensityExtractor={(m) => parseInt(m[2])}
          max={1}
          blur={10}
          radius={30}
          minOpacity={0.2}
          gradient={gradientHeatmap}
        />
      </Map>
    </div>
  );
}