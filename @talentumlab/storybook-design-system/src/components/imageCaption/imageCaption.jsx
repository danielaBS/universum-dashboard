import React from "react";
// import ErrorMessage from '../Others/Error';
import PropTypes from "prop-types";
import Image from "../imageComponent/imageComponent";
import "./imageCaption.module.css";

const ImageCaption = (props) => {
  const { dependent, width, fontSize, text, srcContent } = props;
  let className = dependent ? "" : "image-caption";
  return (
    <div className={className} style={{ width: width, fontSize: fontSize }}>
      <Image width="100%" src={srcContent} />
      <div className="image-caption__content">{text}</div>
    </div>
  );
};

export default ImageCaption; // Don’t forget to use export default!

ImageCaption.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
  text: PropTypes.string,
  srcContent: PropTypes.string,
};

ImageCaption.defaultProps = {
  width: "100%",
  fontSize: "1rem",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  srcContent: "./images/default/default.png",
};
