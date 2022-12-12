import { useRef } from "react";
import styles from "./searchBar.module.css";
import PropTypes from "prop-types";

const SearchBar = ({
  imagePath,
  imageAlt,
  inputValue,
  setSearchBar,
  inputPlaceHolder,
  backgroundColor,
  textColor,
  disabled,
  autofocus,
}) => {
  const inputElement = useRef(null);
  if (autofocus) {
    inputElement.current.focus();
  }
  return (
    <div className={styles.container} style={{ background: backgroundColor }}>
      <input
        ref={inputElement}
        disabled={disabled}
        style={{ background: backgroundColor, color: textColor }}
        type="text"
        name="buscar"
        id="buscar"
        placeholder={inputPlaceHolder}
        value={inputValue}
        onChange={(e) => setSearchBar(e.target.value)}
      />
      <label htmlFor="buscar">
        <img src={imagePath} alt={imageAlt} />
      </label>
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  imagePath: PropTypes.string,
  imageAlt: PropTypes.string,
  inputValue: PropTypes.string,
  setSearchBar: PropTypes.object,
  inputPlaceHolder: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

SearchBar.defaultProps = {
  imagePath: "/images/icons/icon_search.png",
  imageAlt: "This will be an image",
  inputValue: "Buscar",
  inputPlaceHolder: "This is a placeholder",
  backgroundColor: "black",
  textColor: "white",
};
