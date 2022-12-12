import React from "react";
import "./dropDown.module.css";

import PropTypes from "prop-types";
import Image from "../imageComponent/imageComponent";

const selectOption = (value) => {
  console.log(value);
};

const DropDown = (props) => {
  const {
    width,
    fontSize,
    options,
    passedFunction,
    initialValue,
    imageDropDown,
    imageDropUp,
  } = props;

  const [inFocus, setInFocus] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  const optionSelected = (text) => {
    setValue(text);
    setInFocus(!inFocus);
    passedFunction(text);
  };

  let divOptions = options.map((option, i) => (
    <div
      key={i}
      className="options__item"
      onClick={() => optionSelected(option.value)}
    >
      <p>{option.value}</p>
    </div>
  ));

  const styles = {
    width: width,
    fontSize: fontSize,
  };

  return (
    <>
      <div
        className={inFocus ? "dropdown--selected" : "dropdown"}
        style={styles}
      >
        <div className="dropdown__container--text" style={{ fontSize: fontSize }}>
          <p>{value}</p>
        </div>
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setInFocus(!inFocus)}
        >
          <Image width="77%" src={inFocus ? imageDropDown : imageDropUp} />
        </button>
      </div>
      {inFocus ? (
        <div className="options" style={styles}>
          <div>{divOptions}</div>
        </div>
      ) : null}
    </>
  );
};

export default DropDown;

DropDown.propTypes = {
  width: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  passedFunction: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
  imageDropDown: PropTypes.string.isRequired,
  imageDropUp: PropTypes.string.isRequired,
};

DropDown.defaultProps = {
  width: "100%",
  fontSize: "1rem",
  initialValue: "Drop down",
  options: [
    {
      key: 1,
      value: "Select Box 1",
    },
    {
      key: 2,
      value: "Select Box 2",
    },
    {
      key: 3,
      value: "Select Box 3",
    },
    {
      key: 4,
      value: "Select Box 4",
    },
  ],
  imageDropUp: "./images/navigation/arrow_forward.svg",
  imageDropDown: "./images/navigation/arrow_back.svg",
  passedFunction: selectOption,
};
