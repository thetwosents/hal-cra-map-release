import React, { useState } from "react";
import { Row, Col } from "antd";

export const Sidebar = () => {
  const [active, setActive] = useState(true);

  return (
    <>
      <div
        id="sidebar"
        tabIndex={1}
        className={`print-ad ${active ? "active" : ""}`}
      >
        <Row align={"top"} style={{ height: "100vh", padding: "2vw" }}>
          <Col>
            <h1>
              SEE THE WORLD
              <br />
              FROM YOUR DOORSTEP
            </h1>
          </Col>
        </Row>
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
