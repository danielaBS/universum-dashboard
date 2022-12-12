import React from "react";
import PropTypes from "prop-types";
import Search from "../../search/search";
import styles from "./filterAlternative.module.css";

const FilterAlternative = (props) => {
  const {
    title,
    imagePath,
    imageAlt,
    iconSearch,
    setCategory,
    inFocusSearch,
    setInFocusSearch,
    handleChange,
    placeHolderSearch,
    passedFunction,
    children,
  } = props;

  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [indexOption, setIndexOption] = React.useState(0);

  const handleMenuState = () => {
    const isTheMenuActive = menuIsActive;

    if (isTheMenuActive) {
      setMenuIsActive(false);
    } else {
      setMenuIsActive(true);
    }
  };

  const setFilterOptions = (filterSelected, index) => {
    setCategory(filterSelected.name);
    setIndexOption(index);
    // console.log('filter: ', filtersList[filtersList.length - filtersList.length].name)
    if (count === index) {
      setCount(count + 1);
      setShowOptions(true);
    }
    // console.log("index: ", index);
    // console.log("count: ", index);
    // setOptionsResult()
  };

  const handleSelectedResult = (dataOption, categoryFilter) => {
    // passedFunction(dataOption, categoryFilter);
    // setShowOptions(false);
    // setValue(dataOption);
    // setInFocus(!inFocus);

    // if (categoryFilter) setValue(dataOption);
  };

  
  return (
    <div className={styles.container}>
      <div onClick={() => handleMenuState()} className={styles.header}>
        <button>{title}</button>
        <img
          className={`${menuIsActive ? styles.imageRotated : ""}`}
          src={imagePath}
          alt={imageAlt}
        />
      </div>
      {menuIsActive ? (
        <div className={styles.content}>
          <div className={styles.divider}></div>
          <Search
            width={"90%"}
            height="2.7rem"
            background="#14302d"
            fontSize={"14px"}
            handleChange={handleChange}
            inFocus={inFocusSearch}
            setInFocus={setInFocusSearch}
            placeHolder={placeHolderSearch}
            srcIcon={iconSearch}
          />
            <button
              className={styles.clearButton}
              onClick={() => passedFunction()}
            >
              Limpiar Filtros
            </button>

          {/* {filtersList.map((element, index) => {
              return (
                <button
                  disabled={disabledButtons(index) ? true : false}
                  style={{
                    background: isOptionSelected(index) ? "#CDEBEB" : "white",
                  }}
                  onClick={() => setFilterOptions(element, index)}
                  key={index}
                  className={styles.option}
                >
                  {element.name === category ? <p>{value.name}</p> : <p>{element.name}</p>}
                  
                </button>
              );
            })} */}
          <div className={styles.filtersOptions}>{children}</div>
        </div>
      ) : null}
    </div>
  );
};

export default FilterAlternative;

FilterAlternative.propTypes = {
  //   width: PropTypes.string.isRequired,
  //   height: PropTypes.string.isRequired,
  //   fontSize: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  iconSearch: PropTypes.string.isRequired,
  reset: PropTypes.bool,
  handleChange: PropTypes.func,
  passedFunction: PropTypes.func,
};

FilterAlternative.defaultProps = {
  title: "Filtros",
  imagePath: "/images/icons/down_arrow.png",
  iconSearch: "./images/action/search-v2.png",
  imageAlt: "Open menu",
  reset: true,
  passedFunction: () => {}
};
