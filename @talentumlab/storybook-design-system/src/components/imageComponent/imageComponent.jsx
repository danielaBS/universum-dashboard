import React from "react";
import ErrorMessage from "../others/error";
import PropTypes from "prop-types";

const Image = (props) => {
  if (props.src) {
    return (
      <div width="null">
        {
          <img
            key={props.src}
            width="100%"
            src={props.src}
            alt=""
          />
        }
      </div>
    );
  } else {
    return <ErrorMessage message={"Error Image: src no esta definido"} />;
  }
};

export default Image; // Don’t forget to use export default!

Image.propTypes = {
  src: PropTypes.string,
};

Image.defaultProps = {
  src: "./images/default/default.png",
};
