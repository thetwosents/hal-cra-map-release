import React, { useEffect, useState } from "react";
import Logo from "./logo.svg";
import { Row, Col } from "antd";

export const Sidebar = ({ map }) => {
  const [active, setActive] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

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
        className={`print-ad white-bg ${isZoomed ? "is-zoomed" : ""} ${
          active ? "active" : ""
        }`}
      >
        <img src={Logo} className="logo" alt="See the world campaign logo" />
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
