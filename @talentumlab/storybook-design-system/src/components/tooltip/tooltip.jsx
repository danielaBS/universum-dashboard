import React, { useState } from 'react';
import PropTypes from "prop-types";
import './tooltip.module.css';

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  React.useEffect(() => {
    if (props.direction === 'left') {
      setDirection("left");
    } else if (props.direction === 'right') {
      setDirection("right");
    } else if (props.direction === 'bottom') {
      setDirection("bottom");
    }
  }, [props.direction]);

  return (
    <div
      className={"tooltip__wrapper"}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`${"tooltip__tip"} ${direction || "top"}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

Tooltip.propTypes = {
    direction: PropTypes.string.isRequired,
}
Tooltip.defaultProps = {
    direction: "bottom",
}