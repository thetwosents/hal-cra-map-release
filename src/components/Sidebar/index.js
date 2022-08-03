import React, { useEffect, useState } from "react";
import Logo from "./logo.svg";
import { Row, Col } from "antd";

export const Sidebar = ({ map }) => {
  const [active, setActive] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [placement, setPlacement] = useState("left");

  // Check the zoom level on the map to make the logo smaller on zoom in
  useEffect(() => {
    if (map) {
      if (map.current) {
        map.current.on("zoom", () => {
          let zoom = map.current.getZoom();
          if (zoom > 3.5) {
            setIsZoomed(true);
          } else {
            setIsZoomed(false);
          }
        });
      }
    }
  }, [map, map.current]);
  return (
    <>
      <div
        id="sidebar"
        tabIndex={1}
        className={`print-ad white-bg ${
          isZoomed ? "is-zoomed" : ""
        } ${placement} ${active ? "active" : ""}`}
      >
        <img src={Logo} className="logo" alt="See the world campaign logo" />
        <p className="logo-text">
          Visit 225 different ports in 91 countries all from the U.S. or Canada.
          Simply drive or take a flight to one of our North America ports, and
          you can circumnavigate the continents of Africa or Australia, coast
          through the turquoise waters of Tahiti, or experience outdoor
          adventures in Alaska and beyond.
        </p>
      </div>
      <div id="sidebarControl">
        <p style={{ color: "#ffffff" }} onClick={() => setActive(!active)}>
          {active ? "Hide" : "Show"}
        </p>
      </div>
    </>
  );
};

export default Sidebar;
