import React from "react";
import Image from "../imageComponent/imageComponent";
import PropTypes from "prop-types";
import "./dropDownMenu.module.css";

const DropDownMenu = (props) => {
  const [inFocus, setInFocus] = React.useState(false);

  const { items, width, fontSize, srcDown, srcUp, passedFunction } = props;

  let divOptions = items.map((option, i) => (
    <div
      key={i}
      className="dropdown__menu--item"
      onClick={() => optionSelected(option.text)}
    >
      {option.text}
    </div>
  ));

  const optionSelected = (text) => {
    setInFocus(!inFocus);
    passedFunction(text);
  };
  return (
    <>
      <div
        className="dropdown__menu"
        style={{ width: width, fontSize: fontSize }}
      >
        <div className="dropdown__menu--icon" onClick={() => setInFocus(!inFocus)}>
          <Image width="20%" src={inFocus ? srcUp : srcDown} />
        </div>
        {inFocus ? (
          <div className="dropdown__menu--options">{divOptions}</div>
        ) : null}
      </div>
    </>
  );
};

export default DropDownMenu;

DropDownMenu.propTypes = {
  width: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  options: PropTypes.array,
  srcDown: PropTypes.string,
  srcUp: PropTypes.string,
  passedFunction: PropTypes.func,
};

DropDownMenu.defaultProps = {
  width: "10rem",
  fontSize: "1rem",
  items: [
    {
      id: 1,
      text: "First Option",
    },
    {
      id: 2,
      text: "Second Option",
    },
    {
      id: 3,
      text: "Third Option",
    },
  ],
  srcDown: "./images/navigation/arrow_forward.svg",
  srcUp: "./images/navigation/arrow_back.svg",
  passedFunction: null,
};
