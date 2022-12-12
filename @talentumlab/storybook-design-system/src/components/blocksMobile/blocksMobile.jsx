import React from "react";
import ButtonComponent from "../buttonComponent/buttonComponent";
import Image from "../imageComponent/imageComponent";
// import ErrorMessage from './Error';
import PropTypes from "prop-types";
import "./blocksMobile.module.css";

function ChangeFocus(addData, defItem) {
  let ant = addData > 0 ? addData - 1 : defItem.length - 1;
  let next = addData < defItem.length - 1 ? addData + 1 : 0;

  let state = {
    focus: addData,
    ant: ant,
    next: next,
    data: defItem,
  };

  return state;
}

const BlocksMobile = (props) => {
  const { defItem, width, fontSize } = props;

  let focus = defItem.length >= 2 ? 1 : 0;
  const [state, setState] = React.useState(ChangeFocus(focus, props.defItem));

  return (
    <div className="blocks__mobile" style={{ width: width, fontSize: fontSize }}>
      <div className="blocks__mobile--item primary-3-border">
        <div
          className="blocks__mobile--img"
          style={{ width: "20%" }}
          onClick={() => setState(ChangeFocus(state.ant, defItem))}
        >
          <Image width="100%" src={state.data[state.ant].src} />
        </div>
        <div
          className="blocks__mobile--img"
          style={{ width: "30%", margin: "0 0.5em" }}
        >
          <Image width="100%" src={state.data[state.focus].src} />
        </div>
        <div
          className="blocks__mobile--img"
          style={{ width: "20%" }}
          onClick={() => setState(ChangeFocus(state.next, defItem))}
        >
          <Image width="100%" src={state.data[state.next].src} />
        </div>
      </div>
      <div className="blocks__mobile--content">
        <h3>{state.data[state.focus].title}</h3>
        <p>{state.data[state.focus].text}</p>
      </div>
      <div className="blocks__mobile--button">
        <ButtonComponent type="contained" />
      </div>
    </div>
  );
};

export default BlocksMobile; // Don’t forget to use export default!

BlocksMobile.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.string,
};

BlocksMobile.defaultProps = {
  width: "auto",
  fontSize: "1rem",
};
