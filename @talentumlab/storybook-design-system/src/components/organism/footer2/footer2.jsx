import React from "react";
import PropTypes from "prop-types";
import "./footer2.module.css";

const Footer2 = (props) => {
  const { width, fontSize, textLogo, date } = props;
  return (
    <div
      className="container-footer2"
      style={{ width: width, fontSize: fontSize }}
    >
      <div className="container-footer2__content-logo">
        <span className="container-footer2__dot" />
        <div>{textLogo}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default Footer2;

Footer2.propTypes = {
  textLogo: PropTypes.string,
  date: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
};

Footer2.defaultProps = {
  fontSize: "0.9rem",
  width: "100%",
  textLogo: "WEBLOGO",
  date: "© 2021",
};
