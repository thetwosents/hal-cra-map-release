import React, { useEffect, useState, useRef } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Ships from "./components/Ships";
import ships from "./components/Ships/ships.json";

import "./App.scss";
import "antd/dist/antd.css";
import "mapbox-gl/dist/mapbox-gl.css";

function App({ mapboxAccessKey }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(ships);

  if (!mapboxAccessKey) {
    throw new Error("Missing mapboxAccessKey");
  }

  const [browserZoom, setBrowserZoom] = useState(1);
  useEffect(() => {
    if (window) {
      setBrowserZoom(Math.round((window.outerWidth / window.innerWidth) * 100));

      window.addEventListener("resize", () => {
        setBrowserZoom(
          Math.round((window.outerWidth / window.innerWidth) * 100)
        );
      });
    }
  });

  let zoom = 2.8;

  useEffect(() => {
    if (loaded) {
      if (selected < 0) {
        setSelected(data.length - 1);

        map.current.flyTo({
          center: [data[data.length - 1].lng, data[data.length - 1].lat],
          zoom: zoom,
        });
      } else if (selected > data.length - 1) {
        setSelected(0);
        map.current.flyTo({
          center: [data[0].lng, data[0].lat],
          zoom: zoom,
        });
      } else {
        if (selected) {
          map.current.flyTo({
            center: [data[selected].lng, data[selected].lat],
            zoom: zoom,
          });
        } else {
          map.current.flyTo({
            center: [-104, 30],
            zoom: zoom,
          });
        }
      }
    } else {
      setLoaded(true);
    }
  }, [selected]);

  return (
    <div className={`InteractiveMapApp zoom-${browserZoom}`}>
      <Sidebar map={map} />
      <Map
        mapContainer={mapContainer}
        map={map}
        data={data}
        mapboxAccessKey={mapboxAccessKey}
        selected={selected}
        setSelected={setSelected}
      />
      <Ships setSelected={setSelected} selected={selected} data={data} />
    </div>
  );
}

export default App;
