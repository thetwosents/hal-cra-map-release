import React from "react";
import { Row, Col } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";

export const Ships = ({ data, selected, setSelected }) => {
  return (
    <>
      <div
        id="ships"
        tabIndex={3}
        className="ships"
        aria-label="Holland America Line ports in North America to launch from with available sailings"
      >
        <Row>
          {data.map((item, index) => {
            return (
              <ShipItem
                item={item}
                index={index}
                selected={selected}
                setSelected={setSelected}
                key={index}
              />
            );
          })}
        </Row>
      </div>
    </>
  );
};

const ShipItem = ({ item, index, selected, setSelected }) => {
  return (
    <Col
      className={`grid-item ${selected == index ? "active" : ""}`}
      key={index}
    >
      <div
        tabIndex={3}
        className="ship"
        aria-label={`Destinations from ${item.label.substring(
          5,
          item.label.length
        )} include ${item.items.map((detail) => detail)}`}
      >
        <div className="ship__image"></div>
        <h2
          className="ship__title"
          tabIndex={3}
          style={{
            backgroundColor: item.color,
            color: item.textColor,
            padding: "0.5rem",
          }}
          onClick={() => setSelected(index)}
        >
          <img
            src={item.image}
            aria-label={item.alt}
            alt={item.alt}
            width={64}
            height={64}
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
          {item.label}
        </h2>
        <div className="ship__details">
          <ul>
            {item.items.map((detail, i) => {
              return <li key={i}>{detail}</li>;
            })}
          </ul>
        </div>
        <div
          aria-label="View Previous Port"
          className="previous-ship"
          onClick={() => setSelected(index - 1)}
        >
          <LeftCircleOutlined style={{ fontSize: 24 }} />
        </div>
        <div
          aria-label="View Next Port"
          className="next-ship"
          onClick={() => setSelected(index + 1)}
        >
          <RightCircleOutlined style={{ fontSize: 24 }} />
        </div>
      </div>
    </Col>
  );
};

export default Ships;
