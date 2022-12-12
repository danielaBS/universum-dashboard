import React from "react";
import styles from "./optionsFilter.module.css";
import PropTypes from "prop-types";

const selectOption = (value, category) => {
  console.log("category + info: ", value, category);
};

const OptionsFilter = (props) => {
  const {
    optionResults,
    category,
    passedFunction,
    setValue,
    setInFocus,
    inFocus,
  } = props;

  const handleSelectedResult = (dataOption, categoryFilter) => {
    passedFunction(dataOption, categoryFilter);
    setValue(dataOption);
    setInFocus(!inFocus);
  };

  const renderOptions = () => {
    return (
      optionResults
        // .filter((item) => {
        //   return item
        //     .toLowerCase()
        //     .includes(searchBar.trim().toLowerCase());
        // })
        .map((element, index) => (
          <div
            onClick={() => handleSelectedResult(element, category)}
            className={styles.result}
            key={index}
          >
            <p>{element.name}</p>
          </div>
        ))
    );
  };

  return optionResults.length > 0 ? (
    <div className={styles.optionResults}>{renderOptions()}</div>
  ) : null;
};

export default OptionsFilter;

OptionsFilter.propTypes = {
  options: PropTypes.array,
  category: PropTypes.string,
  passedFunction: PropTypes.func,
};

OptionsFilter.defaultProps = {
  category: "default",
  optionResults: [
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
  passedFunction: selectOption,
};
