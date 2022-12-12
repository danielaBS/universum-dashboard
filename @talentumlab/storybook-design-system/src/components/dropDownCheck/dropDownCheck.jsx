import React, { useEffect, useState } from "react";
import Image from "../imageComponent/imageComponent";
import PropTypes from "prop-types";
import "./dropDownCheck.module.css";
// import Options from "../options/options";
// import iconArrow from "../../../images/arrow_dropdown.svg";
import OptionsCheck from "./optionsCheck";

const DropDownCheck = (props) => {
  const {
    minWidth,
    width,
    height,
    fontSize,
    backgroundColor,
    textColor,
    srcDown,
    initialValue,
    className,
    index,
    keepOpen,
    dropdownGap,
    disabled,
    valueSelected,
    options,
    colorOptions,
    idOptions,
    fontSizeOptions,
    iconSearch,
    checkedState,
    setCheckedState,
  } = props;

  const [valueDropdown, setValueDropdown] = useState(initialValue);
  const [focusSearch, setFocusSearch] = useState(false);
  const [focusCheck, setFocusCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);

  const optionSelected = (value) => {
    setValueDropdown(value);
    valueSelected(value);
  };

  useEffect(() => {
    if (!show && focusSearch && !focusCheck) {
      setFocus(true);
    } else if (show && !focusSearch && !focusCheck) {
      setFocus(true);
    } else if (show && focusSearch && !focusCheck) {
      setFocus(true);
    } else if (show && !focusSearch && focusCheck) {
      setFocus(true);
    } else if (!show && !focusSearch && focusCheck) {
      setFocus(true);
    } else if (show && focusSearch && focusCheck) {
      setFocus(true);
    } else if (!show && focusSearch && focusCheck) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [show, focusSearch, focusCheck]);

  useEffect(() => {
    setValueDropdown(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (disabled) {
      setFocus(false);
      setShow(false);
      setFocusSearch(false);
    }
  }, [disabled]);

  return (
    <div
      className={"container_dropDownCheck"}
      style={{
        width: width,
        minWidth: minWidth,
      }}
    >
      <div
        className={`dropDownCheck ${className}`}
        style={{
          width: width,
          minWidth: minWidth,
          fontSize: fontSize,
          height: height,
          backgroundColor: backgroundColor,
          marginBottom: `${dropdownGap}rem`,
          opacity: disabled ? 0.2 : 1,
        }}
        tabIndex={index}
        onClick={() => {
          setShow(!show);
          setFocusCheck(false);
        }}
        // onFocus={() => (!disabled ? setShow(true) : null)}
        onBlur={() => {
          keepOpen
            ? setShow(true)
            : setTimeout(() => {
                console.log("entra");
                setShow(false);
                //   setFocusCheck(false);
              }, 170);
        }}
      >
        <div className={"dropDownCheck__title"} style={{ color: textColor }}>
          <div>{`${valueDropdown.length} seleccionados`}</div>
        </div>
        <div
          className={"dropDownCheck__icon"}
          style={
            focus
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
        >
          <Image width="100%" src={srcDown} />
        </div>
        <input id={index} style={{ display: "none" }} />
      </div>
      {focus && !disabled && (
        <OptionsCheck
          setValue={optionSelected}
          showOptions={(value) => setShow(value)}
          options={options}
          colorOptions={colorOptions}
          idOptions={idOptions}
          fontSizeOptions={fontSizeOptions}
          setFocusSearch={(value) => setFocusSearch(value)}
          setFocusCheck={(value) => setFocusCheck(value)}
          iconSearch={iconSearch}
          checkedState={checkedState}
          setCheckedState={setCheckedState}
        />
      )}
    </div>
  );
};

export default DropDownCheck;

DropDownCheck.propTypes = {
  minWidth: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  srcDown: PropTypes.string,
  srcUp: PropTypes.string,
  initialValue: PropTypes.array,
  keepOpen: PropTypes.bool.isRequired,
  dropdownGap: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.any,
  onFocus: PropTypes.any.isRequired,
  onBlur: PropTypes.any.isRequired,
  onReset: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  colorOptions: PropTypes.string.isRequired,
  fontSizeOptions: PropTypes.string.isRequired,
  idOptions: PropTypes.any.isRequired,
  valueSelected: PropTypes.any.isRequired,
  className: PropTypes.string,
  iconSearch: PropTypes.string,
};

DropDownCheck.defaultProps = {
  minWidth: "2rem",
  width: "15rem",
  height: "2.5rem",
  fontSize: "13px",
  backgroundColor: "#FFFFFF",
  textColor: "#4B4B4B",
  index: 0,
  className: null,
  initialValue: [],
  dropdownGap: 1,
  keepOpen: false,
  disabled: false,
  srcDown: "./images/action/arrow_dropdown.svg",
  iconSearch: "./images/action/search.svg",
  onReset: () => {
    // console.log("This function is called when is focussed");
  },
  onFocus: () => {
    // console.log("This function is called when is focussed");
  },
  onBlur: () => {
    // console.log("This function is called when is blurred");
  },
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
