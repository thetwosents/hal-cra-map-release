import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import data from "./see-the-world.json";
import destinations from "./destinations.json";
import * as turf from "@turf/turf";
import Arrow1 from "./2A7665.png";
import Arrow2 from "./DB3633.png";
import Arrow3 from "./4AC5AF.png";
import Arrow4 from "./FEBD5B.png";
import Arrow5 from "./FF7F32.png";
import Arrow6 from "./B8CCEA.png";

export const Map = ({
  mapboxAccessKey,
  mapContainer,
  map,
  selected,
  setSelected,
}) => {
  let mapPreferences = {
    center: [-104, 30],
    zoom: 2.8,
    pitch: 5,
  };

  const [lng, setLng] = useState(mapPreferences.center[0]);
  const [lat, setLat] = useState(mapPreferences.center[1]);
  const [zoom, setZoom] = useState(mapPreferences.zoom);
  const [pitch, setPitch] = useState(mapPreferences.pitch);

  useEffect(() => {
    if (!mapboxAccessKey) {
      throw new Error("Missing mapboxAccessKey");
    }
    // Set the mapbox.accessToken to the mapboxAccessKey
    mapboxgl.accessToken = mapboxAccessKey;
  }, [mapboxAccessKey]);

  useEffect(() => {
    if (map.current) return; // Check ref to see if map is already initialized

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/cloudstrifejon/cl4oq4rng000c14ukqfk430zp/draft",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 2,
      pitch: pitch,
    });

    map.current.scrollZoom.disable();

    map.current.on("load", () => {
      // Disable tabindex from mapbox to control keyboard navigation
      document.querySelector(".mapboxgl-canvas").tabIndex = -1;
      document.querySelector(".mapboxgl-canvas").disabled = true;
      document.querySelector(".mapboxgl-ctrl-logo").tabIndex = -1;
      document.querySelector(".mapboxgl-ctrl-logo").disabled = true;
      document.querySelector(".mapboxgl-ctrl-attrib-inner a").tabIndex = 8;
      document.querySelector(".mapboxgl-ctrl-attrib-inner a").disabled = true;
      document.querySelector(".mapboxgl-ctrl-bottom-right").disabled = true;
      document.querySelector(".mapboxgl-ctrl-bottom-right").tabIndex = 8;

      // Add routes
      addLine(map.current, "points", data, "routes", "#2A7665");

      // Add ending arrows
      addEndingArrows(map.current);

      // Add markers
      destinations.map((dest, i) => {
        let marker = addMarker(
          dest.lng,
          dest.lat,
          map.current,
          dest.label,
          dest.color,
          dest.textColor,
          dest.left,
          dest.top,
          i
        );
        dest.marker = marker;
      });

      // Add click event to markers
      document.querySelectorAll(".marker-label-container").forEach((marker) => {
        marker.addEventListener("click", (e) => {
          let index = marker.getAttribute("data-index");
          setSelected(index);
        });
      });

      // If the user uses tab to navigate, change the selected marker
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 9) {
          // If the selected element is a marker, change the selected marker
          if (
            document.activeElement.classList.contains("marker-label-container")
          ) {
            let index = document.activeElement.getAttribute("data-index");
            // Convert index to int
            index = parseInt(index) + 1;
            setSelected(index);
          } else {
            // If the selected element is not a marker, change the selected marker to the first marker
            setSelected(0);
          }
        }
      });

      // If a user clicks the body
      document.body.addEventListener("click", (e) => {
        // The clicked element is not a marker
        let clicked = e.target.classList.contains("mapboxgl-canvas");

        if (clicked) {
          setSelected(null);
        }
      });
    });
  }, []);
  return (
    <div
      ref={mapContainer}
      tabIndex={2}
      className="map-container"
      aria-label="Use keyboard control tab to view each of the ports on the map"
    />
  );
};

const addLine = (map, id, data, newId) => {
  map.addSource(newId, {
    type: "geojson",
    data: data,
  });

  map.addLayer({
    id: id,
    type: "line",
    source: {
      type: "geojson",
      data: data,
    },
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": ["get", "color"],
      "line-width": 3,
      "line-opacity": 0.9,
    },
  });

  addArrowToLine(map, newId);
};

const addArrowToLine = (map, newId) => {
  map.loadImage(Arrow1, (err, image) => {
    if (err) throw err;
    map.addImage("#2A7665", image);
    map.addLayer({
      id: "#2A7665",
      type: "symbol",
      source: newId, // reference the data source
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 2,
        "icon-allow-overlap": true,
        // 'icon-ignore-placement': true,
        "icon-image": ["get", "color"],
        "icon-size": 0.085,
        visibility: "visible",
      },
    });
  });

  map.loadImage(Arrow2, (err, image) => {
    if (err) throw err;
    map.addImage("#DB3633", image);
    map.addLayer({
      id: "#DB3633",
      type: "symbol",
      source: newId, // reference the data source
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 2,
        "icon-allow-overlap": true,
        // 'icon-ignore-placement': true,
        "icon-image": ["get", "color"],
        "icon-size": 0.085,
        visibility: "visible",
      },
    });
  });

  map.loadImage(Arrow3, (err, image) => {
    if (err) throw err;
    map.addImage("#4AC5AF", image);
    map.addLayer({
      id: "#4AC5AF",
      type: "symbol",
      source: newId, // reference the data source
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 2,
        "icon-allow-overlap": true,
        // 'icon-ignore-placement': true,
        "icon-image": ["get", "color"],
        "icon-size": 0.085,
        visibility: "visible",
      },
    });
  });

  map.loadImage(Arrow4, (err, image) => {
    if (err) throw err;
    map.addImage("#FEBD5B", image);
    map.addLayer({
      id: "#FEBD5B",
      type: "symbol",
      source: newId, // reference the data source
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 2,
        "icon-allow-overlap": true,
        // 'icon-ignore-placement': true,
        "icon-image": ["get", "color"],
        "icon-size": 0.085,
        visibility: "visible",
      },
    });
  });

  map.loadImage(Arrow5, (err, image) => {
    if (err) throw err;
    map.addImage("#FF7F32", image);
    map.addLayer({
      id: "#FF7F32",
      type: "symbol",
      source: newId, // reference the data source
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 2,
        "icon-allow-overlap": true,
        // 'icon-ignore-placement': true,
        "icon-image": ["get", "color"],
        "icon-size": 0.085,
        visibility: "visible",
      },
    });
  });

  map.loadImage(Arrow6, (err, image) => {
    if (err) throw err;
    map.addImage("#B8CCEA", image);
    map.addLayer({
      id: "#B8CCEA",
      type: "symbol",
      source: newId, // reference the data source
      layout: {
        "symbol-placement": "line",
        "symbol-spacing": 2,
        "icon-allow-overlap": true,
        // 'icon-ignore-placement': true,
        "icon-image": ["get", "color"],
        "icon-size": 0.085,
        visibility: "visible",
      },
    });
  });
};

const addMarker = (
  lng,
  lat,
  map,
  label,
  color,
  textColor,
  left,
  top,
  index
) => {
  var el = document.createElement("div");
  el.tabIndex = 2;
  el.className = "marker-label-container";
  el.setAttribute("data-index", index);
  el.ariaLabel = label;
  el.innerHTML = `<span class="marker-label">${label}</span>`;
  el.style.backgroundColor = color;
  el.style.color = textColor;
  el.style.width = "100px";
  el.style.height = "32px";
  el.style.left = left;
  el.style.top = top;
  el.style.borderRadius = "0px";
  el.style.border = "0px";
  let marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

  map.addSource(label, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      ],
    },
  });

  map.addLayer({
    id: label,
    type: "circle",
    source: label,
    paint: {
      "circle-color": "#ffffff",
      "circle-radius": 3,
      "circle-stroke-width": 2,
      "circle-stroke-color": color,
    },
  });
  return marker;
};

function addEndingArrows(map) {
  if (data.features.length > 0) {
    data.features.forEach((feature, index) => {
      let color = feature.properties.color;

      let lastPoint =
        feature.geometry.coordinates[feature.geometry.coordinates.length - 1];
      let secondToLastPoint =
        feature.geometry.coordinates[feature.geometry.coordinates.length - 2];

      // Calculate the bearing between the last point and the second to last point
      let bearing = turf.bearing(
        turf.point([secondToLastPoint[0], secondToLastPoint[1]]),
        turf.point([lastPoint[0], lastPoint[1]])
      );

      // if (color === "#FEBD5B") {
      //   console.log(
      //     "color",
      //     color,
      //     lastPoint,
      //     secondToLastPoint,
      //     bearing,
      //     index
      //   );
      // } else {
      //   console.log("color", color);
      // }

      map.addSource(`${index}`, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [lastPoint, secondToLastPoint],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: `endingArrow${index}`,
        type: "symbol",
        source: `${index}`,
        layout: {
          "symbol-placement": "point",
          // "icon-allow-overlap": ,
          "icon-rotate": bearing + -90,
          // "icon-ignore-placement": true,
          "icon-image": `${color}`,
          "icon-size": 0.09,
          visibility: "visible",
        },
        paint: {
          "icon-opacity": 1,
        },
      });
    });
  }
}

export default Map;
