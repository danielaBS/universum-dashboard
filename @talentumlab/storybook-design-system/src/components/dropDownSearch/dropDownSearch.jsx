import React, { useEffect, useState } from "react";
import Image from "../imageComponent/imageComponent";
import PropTypes from "prop-types";
import "./dropDownSearch.module.css";
// import Options from "../options/options";
// import iconArrow from "../../../images/arrow_dropdown.svg";
import OptionsSearch from "./optionsSearch";

const DropdownSearch = (props) => {
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
  } = props;

  const [valueDropdown, setValueDropdown] = useState(initialValue);
  const [focusSearch, setFocusSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);

  const optionSelected = (value) => {
    setValueDropdown(value);
    valueSelected(value);
  };

  useEffect(() => {
    if (!show && focusSearch) {
      setFocus(true);
    } else if (show && !focusSearch) {
      setFocus(true);
    } else if (show && focusSearch) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [show, focusSearch]);

  useEffect(() => {
    setValueDropdown(initialValue);
  }, [initialValue]);

  return (
    <div
      className={"container_dropDownSearch"}
      style={{
        width: width,
        minWidth: minWidth,
      }}
    >
      <div
        className={`dropDownSearch ${className}`}
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
        //   onClick={() => setShow(!show)}
        onFocus={() => (!disabled ? setShow(!show) : null)}
        onBlur={() => {
          keepOpen
            ? setShow(true)
            : setTimeout(() => {
                console.log("entra");
                setShow(false);
              }, 180);
        }}
      >
        <div className={"dropDownSearch__title"} style={{ color: textColor }}>
          <div>{valueDropdown.value.name}</div>
        </div>
        <div
          className={"dropDownSearch__icon"}
          style={
            show
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
        >
          <Image width="100%" src={srcDown} />
        </div>
        <input id={index} style={{ display: "none" }} />
      </div>
      {focus && (
        <OptionsSearch
          setValue={optionSelected}
          showOptions={(value) => setShow(value)}
          options={options}
          colorOptions={colorOptions}
          idOptions={idOptions}
          fontSizeOptions={fontSizeOptions}
          setFocusSearch={(value) => setFocusSearch(value)}
          iconSearch={iconSearch}
        />
      )}
    </div>
  );
};

export default DropdownSearch;

DropdownSearch.propTypes = {
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

DropdownSearch.defaultProps = {
  minWidth: "2rem",
  width: "15rem",
  height: "2.5rem",
  fontSize: "13px",
  textColor: "black",
  index: 0,
  className: null,
  initialValue: { value: { id: 0, name: "Todas" }, id: "Todas" },
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
      name: "Cerrito",
    },
  ],
};
