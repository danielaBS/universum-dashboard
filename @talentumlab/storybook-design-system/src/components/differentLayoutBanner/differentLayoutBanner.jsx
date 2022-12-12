import React from "react";
import ButtonComponent from "../buttonComponent/buttonComponent";
import PropTypes from "prop-types";
import "./differentLayoutBanner.module.css";

const DifferentLayoutBanner = (props) => {
  const {
    width,
    fontSize,
    title,
    text,
    typeButton,
    textButton1,
    textButton2,
    src,
  } = props;

  return (
    <div className="different__banner" style={{ width: width }}>
      <div
        className="different__banner--bg"
        style={{ backgroundImage: `url(${src})` }}
      >
        <div className="different__banner--info" style={{ fontSize: fontSize }}>
          <div className="different__banner--title">{title}</div>
          <div className="different__banner--text">{text}</div>
          <div className="different__banner--container-buttons">
            <div>
              <ButtonComponent
                text={textButton1}
                type={typeButton}
                color={"#ffffff"}
              />
            </div>
            <div>
              <ButtonComponent
                text={textButton2}
                type={typeButton}
                color={"#ffffff"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentLayoutBanner;

DifferentLayoutBanner.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  typeButton: PropTypes.oneOf(["text", "outlined", "contained"]),
  src: PropTypes.string,
  timePublished: PropTypes.string,
  textButton1: PropTypes.string,
  textButton2: PropTypes.string,
};

DifferentLayoutBanner.defaultProps = {
  width: "70%",
  fontSize: "1rem",
  title: "Promotion",
  text:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est minus impedit eius",
  typeButton: "outlined",
  src: "./images/banner/fondo-banner.jpg",
  timePublished: "Yesterday",
  textButton1: "ENABLED",
  textButton2: "HOVERED",
};
