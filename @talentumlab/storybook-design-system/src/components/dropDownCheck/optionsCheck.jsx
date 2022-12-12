import React from "react";
import PropTypes from "prop-types";
import "./optionsCheck.module.css";
import Image from "../imageComponent/imageComponent";

const OptionsCheck = (props) => {
  const {
    options,
    fontSizeOptions,
    colorOptions,
    setValue,
    showOptions,
    idOptions,
    iconSearch,
    setFocusSearch,
    setFocusCheck,
    checkedState,
    setCheckedState,
  } = props;

  const optionSelected = (infoOption, position) => {
    // console.log({ value: infoOption, id: position });
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    setValue(updatedCheckedState);
    setTimeout(() => showOptions(true), 0);
  };

  const [inputSearch, setInputSearch] = React.useState("");

  const filteredFilters = options.filter((data) => {
    return data.name
      .toString()
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  let divOptions = filteredFilters.map((option, i) => (
    <label
      className={"result__options_value"}
      style={{ fontSize: fontSizeOptions, color: colorOptions }}
      key={i}
    >
      <input
        type="checkbox"
        checked={checkedState[option.id] === true ? true : false}
        onChange={() =>
          optionSelected({ id: option.id, name: option.name }, option.id)
        }
      />
      {option.name}
    </label>
  ));
  return (
    <div
      className={"result__options_check"}
      tabIndex={idOptions}
      onClick={() => setFocusCheck(true)}
    >
      <div className={"search_input"}>
        <div className={"search__searchButton"}>
          <div>
            <Image src={iconSearch} />
          </div>
        </div>
        <input
          type="search"
          placeholder={"Buscar"}
          onChange={(e) => handleChange(e.target.value)}
          //   onClick={() => setFocusSearch(true)}

          onFocus={() => setFocusSearch(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocusSearch(false);
            }, 170)
          }
        />
      </div>
      {divOptions}
      <input
        id={idOptions}
        style={{ display: "none" }}
        onFocus={() => {
          setFocusCheck(true);
        }}
        onBlur={() =>
          setTimeout(() => {
            setFocusCheck(false);
            console.log("We");
          }, 0)
        }
      />
    </div>
  );
};

export default OptionsCheck;

OptionsCheck.propTypes = {
  fontSizeOptions: PropTypes.string.isRequired,
  colorOptions: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  idOptions: PropTypes.string.isRequired,
  showOptions: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired,
  iconSearch: PropTypes.string.isRequired,
  setFocusSearch: PropTypes.func.isRequired,
  setFocusCheck: PropTypes.func.isRequired,
};

OptionsCheck.defaultProps = {
  fontSizeOptions: "15px",
  colorOptions: "#4B4B4B",
  idOptions: "default",
  setValue: () => {},
  showOptions: () => {},
  setFocusSearch: () => {},
  iconSearch: "./images/action/search.svg",
  setFocusCheck: () => {},
  options: [
    {
      id: 1,
      name: "Option 1",
    },
    {
      id: 2,
      name: "Option 2",
    },
    {
      id: 3,
      name: "Option 3",
    },
    {
      id: 4,
      name: "Option 4",
    },
    {
      id: 5,
      name: "Option 5",
    },
    {
      id: 6,
      name: "Option 6",
    },
    {
      id: 7,
      name: "Option 7",
    },
  ],
};
