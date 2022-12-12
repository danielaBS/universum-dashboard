import React, { useState, useEffect } from "react";
import Image from "../imageComponent/imageComponent";
import PropTypes from "prop-types";
import "./dropDown_v2.module.css";
import Options from "../options/options";

const DropDownV2 = (props) => {
  const {
    minWidth,
    width,
    height,
    fontSize,
    backgroundColor,
    className,
    textColor,
    srcDown,
    initialValue,
    onReset,
    onFocus,
    onBlur,
    index,
    keepOpen,
    dropdownGap,
    disabled,
    valueSelected,
    options,
    colorOptions,
    idOptions,
    fontSizeOptions,
    classNameOptions,
  } = props;

  const [valueDropdown, setValueDropdown] = useState(initialValue);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setValueDropdown(initialValue);
  }, [initialValue]);

  const showOptionsDropdown = (value) => {
    onFocus(value);
    setShow(value);
  };

  const hideOptionsDropdown = (value) => {
    onBlur(value);
    setShow(value);
  };

  const optionSelected = (value) => {
    setValueDropdown(value);
    valueSelected(value);
  };

  return (
    <>
      <div
        tabIndex={index}
        className={`dropDownV2 ${className}`}
        onFocus={() => (!disabled ? showOptionsDropdown(true) : null)}
        onBlur={() =>
          keepOpen
            ? showOptionsDropdown(true)
            : setTimeout(() => {
                hideOptionsDropdown(false);
              }, 170)
        }
        onReset={() => onReset()}
        style={{
          width: width,
          minWidth: minWidth,
          fontSize: fontSize,
          height: height,
          backgroundColor: backgroundColor,
          marginBottom: `${dropdownGap}rem`,
          opacity: disabled ? 0.2 : 1,
        }}
      >
        <div className="dropDownV2--title" style={{ color: textColor }}>
          <div>{valueDropdown.value.name}</div>
        </div>
        <div className="dropDownV2--icon">
          <img
            style={
              show ? { transform: "scaleY(-1)" } : { transform: "scaleY(1)" }
            }
            width="100%"
            src={srcDown}
            alt={"icon of the dropdown"}
          />
        </div>
        <input id={index} style={{ display: "none" }} />
      </div>
      {show && (
        <Options
          setValue={optionSelected}
          showOptions={(value) => hideOptionsDropdown(value)}
          options={options}
          colorOptions={colorOptions}
          idOptions={idOptions}
          fontSizeOptions={fontSizeOptions}
          classNameOptions={classNameOptions}
        />
      )}
    </>
  );
};

export default DropDownV2;

DropDownV2.propTypes = {
  minWidth: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  srcDown: PropTypes.string,
  srcUp: PropTypes.string,
  initialValue: PropTypes.object.isRequired,
  keepOpen: PropTypes.bool.isRequired,
  dropdownGap: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
  classNameOptions: PropTypes.string,
  onChange: PropTypes.any,
  onFocus: PropTypes.any.isRequired,
  onBlur: PropTypes.any.isRequired,
  onReset: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  colorOptions: PropTypes.string.isRequired,
  fontSizeOptions: PropTypes.string.isRequired,
  idOptions: PropTypes.any.isRequired,
  valueSelected: PropTypes.any.isRequired,
};

DropDownV2.defaultProps = {
  minWidth: "2rem",
  width: "15rem",
  height: "2rem",
  fontSize: "13px",
  backgroundColor: "#FFFFFF",
  textColor: "#4B4B4B",
  index: 0,
  initialValue: { value: { id: 0, name: "Default" }, id: "Default" },
  dropdownGap: 1,
  keepOpen: false,
  disabled: false,
  className: null,
  srcDown: "./images/action/arrow_dropdown.svg",
  onReset: () => {
    console.log("This function is called when is focussed");
  },
  onFocus: () => {
    console.log("This function is called when is focussed");
  },
  onBlur: () => {
    console.log("This function is called when is blurred");
  },
  classNameOptions: null,
  fontSizeOptions: "13px",
  colorOptions: "#4B4B4B",
  idOptions: "default",
  valueSelected: () => {},
  options: [
    {
      id: 1,
      name: "Candelaria texto de verda bien largo",
    },
    {
      id: 2,
      name: "Alfonso lopez de la santisima trinidad maría",
    },
    {
      id: 3,
      name: "Cerrito de los valles grandes de su señor",
    },
    {
      id: 4,
      name: "Cumbre",
    },
    {
      id: 5,
      name: "Cartago",
    },
    {
      id: 6,
      name: "Palmira",
    },
    {
      id: 7,
      name: "Yumbo",
    },
  ],
};
