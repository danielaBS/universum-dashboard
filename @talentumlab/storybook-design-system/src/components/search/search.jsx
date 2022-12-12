import React from "react";
import Image from "../imageComponent/imageComponent";
import PropTypes from "prop-types";
import "./search.module.css";

const Search = (props) => {
  const {
    inputWidth,
    inputHeight,
    inputFontSize,
    srcIcon,
    placeholder,
    inputBackgroundColor,
    onChange,
    onFocus,
    onBlur,
    inputFontColor,
    leftIcon,
  } = props;

  const leftIconNode = () => {
    if (!leftIcon) {
      return null;
    }

    return (
      <div className="search__searchButton">
        <div>
          <Image src={srcIcon} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="search"
      style={{
        width: inputWidth,
        height: inputHeight,
        background: inputBackgroundColor,
      }}
    >
      {leftIconNode()}
      <input
        type="search"
        placeholder={placeholder}
        style={{
          fontSize: inputFontSize,
          background: inputBackgroundColor,
          color: inputFontColor,
        }}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onFocus()}
        onBlur={() => {
          setTimeout(() => {
            onBlur();
          }, 160);
        }}
      />
    </div>
  );
};

export default Search;

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
  onFocus: PropTypes.any.isRequired,
  onBlur: PropTypes.any.isRequired,
  inputFontColor: PropTypes.string.isRequired,
  inputFontSize: PropTypes.string.isRequired,
  inputWidth: PropTypes.string.isRequired,
  inputHeight: PropTypes.string.isRequired,
  inputBackgroundColor: PropTypes.string.isRequired,
  leftIcon: PropTypes.bool.isRequired,
  srcIcon: PropTypes.string.isRequired,
};

Search.defaultProps = {
  placeholder: "Buscar",
  onChange: (value) => console.log(value),
  onFocus: () => {
    console.log("This function is called when is focussed");
  },
  onBlur: () => {
    console.log("This function is called when is blurred");
  },
  inputFontColor: "#686868",
  inputFontSize: "0.9rem",
  inputWidth: "100%",
  inputHeight: "2rem",
  inputBackgroundColor: "#F7F8FA",
  leftIcon: false,
  srcIcon: "./images/action/search.svg",
};
