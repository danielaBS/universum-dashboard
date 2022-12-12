import { useState, useEffect } from "react";
import SearchBar from "./../../SearchBarV2";
import styles from "./filter.module.css";

const Filter = ({ title, imagePath, imageAlt, filtersList, optionResults }) => {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [options, setOptions] = useState({});
  const [oneOptionIsSelected, setOneOptionIsSelected] = useState(false);
  const [searchBar, setSearchBar] = useState("");

  const handleMenuState = () => {
    const isTheMenuActive = menuIsActive;

    if (isTheMenuActive) {
      setMenuIsActive(false);
    } else {
      setMenuIsActive(true);
    }
  };

  const setFilterOptions = () => {
    const objectToSet = {};
    filtersList.forEach((element, index) => {
      objectToSet[index] = {
        optionTitle: element.optionTitle,
        current: false,
        keepSelected: false,
      };
    });
    setOptions(objectToSet);
  };

  const handleSelectedOption = (index) => {
    const lastestOptionSelected = getLatestOptionSelected();

    setOptions({
      ...options,
      ...lastestOptionSelected,
      [index]: {
        optionTitle: options[index].optionTitle,
        current: true,
        keepSelected: false,
      },
    });

    filtersList[index].opFunction();
  };

  const getLatestOptionSelected = () => {
    for (let property in options) {
      if (options.hasOwnProperty(property)) {
        if (options[property].current === true) {
          return {
            [property]: {
              optionTitle: options[property].optionTitle,
              current: false,
              keepSelected: false,
            },
          };
        }
      }
    }
  };

  const handleSelectedResult = (result) => {
    const lastestOptionSelected = getLatestOptionSelected();
    const optionNumber = Object.keys(lastestOptionSelected);
    lastestOptionSelected[optionNumber].keepSelected = true;
    setOptions({
      ...options,
      ...lastestOptionSelected,
    });
    optionResults.setSelectedFilters(
      [
        ...optionResults.selectedFilters,
        {
          optionNumber: parseInt(optionNumber[0]),
          optionTitle: lastestOptionSelected[optionNumber].optionTitle,
          filter: result,
        },
      ].sort((a, b) => a.optionNumber - b.optionNumber)
    );
    optionResults.setFilterOptionsResult(undefined);
  };

  const unselectAllOptions = () => {
    setFilterOptions();
    optionResults.setFilterOptionsResult(undefined);
    optionResults.setSelectedFilters([]);
  };

  const getIfOneOptionIsSelected = () => {
    if (optionResults.selectedFilters.length > 0) {
      setOneOptionIsSelected(true);
    } else {
      setOneOptionIsSelected(false);
    }
  };

  useEffect(() => {
    getIfOneOptionIsSelected();
  }, [optionResults.selectedFilters]);

  useEffect(() => {
    setFilterOptions();
  }, []);

  const ifFilterListHasContent = typeof filtersList === "object";
  const ifOptionsResultsHasContent =
    typeof optionResults.filterOptionsResult === "object";

  const isOptionSelected = (option) =>
    options[option].current || options[option].keepSelected;
  const isOptionAlreadySelected = (option) =>
    options[option].current || options[option].keepSelected;

  // console.log(options);

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
          <SearchBar
            autofocus={ifOptionsResultsHasContent ? true : false}
            disabled={ifOptionsResultsHasContent ? false : true}
            inputPlaceHolder="Buscar..."
            inputValue={searchBar}
            setSearchBar={setSearchBar}
            imagePath="/images/icons/icon_search.png"
            imageAlt="Buscar input"
            backgroundColor="#092F24"
            textColor="white"
          />
          {oneOptionIsSelected ? (
            <button
              className={styles.clearButton}
              onClick={() => unselectAllOptions()}
            >
              Limpiar Filtros
            </button>
          ) : (
            ""
          )}
          <div className={styles.filtersOptions}>
            {ifFilterListHasContent
              ? filtersList.map((element, index) => {
                  return (
                    <div
                      style={{
                        background: isOptionSelected(index)
                          ? "#CDEBEB"
                          : "white",
                      }}
                      onClick={
                        isOptionAlreadySelected(index)
                          ? () => {}
                          : () => {
                              handleSelectedOption(index);
                            }
                      }
                      key={index}
                      className={styles.option}
                    >
                      <p>{element.optionTitle}</p>
                    </div>
                  );
                })
              : ""}
          </div>
          {ifOptionsResultsHasContent ? (
            <div className={styles.optionResults}>
              {optionResults.filterOptionsResult
                .filter((item) => {
                  return item
                    .toLowerCase()
                    .includes(searchBar.trim().toLowerCase());
                })
                .map((element, index) => (
                  <div
                    onClick={() => handleSelectedResult(element)}
                    className={styles.result}
                    key={index}
                  >
                    <p>{element}</p>
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
