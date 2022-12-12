import React from "react";
import PropTypes from "prop-types";
import "./alert.module.css";
import Image from "../imageComponent/imageComponent";

const Alert = (props) => {
  const {
    srcIcon,
    text,
    leftIcon,
    width,
    height,
    bgColor,
    borderRadius,
    fontSize,
    color,
  } = props;

  const styles = {
    width: width,
    height: height,
    backgroundColor: bgColor,
    borderRadius: borderRadius,
    fontSize: fontSize,
    color: color,
  };

  return (
    <div className="alert" style={styles}>
      {leftIcon && (
        <div className="alert__icon">
          <Image width="100%" src={srcIcon} />
        </div>
      )}
      <div className="alert__text">{text}</div>
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  leftIcon: PropTypes.bool.isRequired,
  srcIcon: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  width: "auto",
  height: "auto",
  fontSize: "15px",
  bgColor: "#D5FFCB",
  color: "#4B4B4B",
  borderRadius: "5px",
  text: "La información se ha actualizado.",
  leftIcon: true,
  srcIcon: "./images/action/search.svg",
};
