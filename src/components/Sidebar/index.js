import React, { useEffect, useState } from "react";
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
        <img
          src={
            "https://hal-cra-map-release.vercel.app/static/media/logo.ed45e7d8d0349e09a449be4e4a623223.svg"
          }
          className="logo"
          alt="See the world campaign logo"
        />
        <div className="divider"></div>
        <p className="logo-text">
          Visit <span>225 different ports in 91 countries</span> all from the
          U.S. or Canada
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
