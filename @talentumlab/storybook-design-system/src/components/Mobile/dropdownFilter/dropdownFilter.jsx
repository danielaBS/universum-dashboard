import React from "react";
import PropTypes from "prop-types";
import styles from "./dropdownFilter.module.css";

const DropdownFilter = (props) => {
  const {
    initialValue,
    value,
    setValue,
    reset,
    setReset,
    inFocus,
    setInFocus,
    category,
    setCategory,
    setPlaceHolderSearch,
    passedFunction,
    disabled,
  } = props;

  React.useEffect(() => {
    if (reset) {
      setValue(initialValue);
      setReset(false);
    }
  }, [reset, initialValue, setReset, setValue]);

  //   const disabledButtons = (indexButton) => {
  //     if (count === indexButton) {
  //       return false;
  //     }
  //     return true;
  //   };

  const handleDropDown = () => {
    setPlaceHolderSearch("Buscar " + category);
    setCategory(category);
    passedFunction(category);
  };

  return (
    <button
      style={{
        background: inFocus && !disabled ? "#CDEBEB" : "white",
      }}
      onClick={() => handleDropDown()}
      onFocus={() => setInFocus(!inFocus)}
      onBlur={() =>
        setTimeout(() => {
          setInFocus(!inFocus);
        }, 150)
      }
      className={styles.option}
      disabled={disabled}
    >
      <p>{value.name}</p>
    </button>
  );
};

export default DropdownFilter;

DropdownFilter.propTypes = {
  // maxWidth: PropTypes.string.isRequired,
  // width: PropTypes.string.isRequired,
  // fontSize: PropTypes.string,
  // backgroundColor: PropTypes.string.isRequired,
  // color: PropTypes.string.isRequired,
  initialValue: PropTypes.object.isRequired,
  /* value: PropTypes.object, */
  reset: PropTypes.bool,
  options: PropTypes.array,
  srcDown: PropTypes.string,
  srcUp: PropTypes.string,
  inFocus: PropTypes.bool,
  passedFunction: PropTypes.func,
};

DropdownFilter.defaultProps = {
  initialValue: { id: 0, name: "Text Here" },
  inFocus: false,
  reset: false,
  passedFunction: () => {},
};
