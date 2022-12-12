import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./optionsSearch.module.css";
import Image from "../imageComponent/imageComponent";

const OptionsSearch = (props) => {
  const {
    options,
    fontSizeOptions,
    colorOptions,
    setValue,
    showOptions,
    idOptions,
    iconSearch,
    setFocusSearch,
  } = props;

  const refRow = useRef(null);
  const refText = useRef(null);

  const optionSelected = (infoOption, optionId) => {
    setValue({ value: infoOption, id: optionId });
    setTimeout(() => showOptions(false), 0);
  };

  const [inputSearch, setInputSearch] = React.useState("");
  const [classOption, setClassOption] = React.useState({ id: null, class: "" });
  const [wRow, setWRow] = React.useState(
    refRow.current ? refRow.current.offsetWidth : 0
  );
  const [wText, setWText] = React.useState(
    refText.current ? refText.current.offsetWidth : 0
  );

  useEffect(() => {
    if (classOption) {
      setWRow(refRow.current ? refRow.current.offsetWidth : 0);
      setWText(refText.current ? refText.current.offsetWidth : 0);
    }
  }, [refRow, refText, classOption]);

  const filteredFilters = options.filter((data) => {
    return data.name
      .toString()
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  const measureSizeText = (index) => {
    // let widthRow = refRow.current ? refRow.current.offsetWidth : 0;
    // let widthText = refText.current ? refText.current.offsetWidth : 0;

    if (classOption.id === index && wText >= wRow) {
      return classOption.class;
    } else {
      return "";
    }
  };

  let divOptions = filteredFilters.map((option, i) => (
    <div
      key={i}
      className={"result__options_value_search"}
      style={{ fontSize: fontSizeOptions, color: colorOptions }}
      ref={refRow}
      onClick={() =>
        optionSelected({ id: option.id, name: option.name }, idOptions)
      }
      onMouseEnter={() => setClassOption({ id: i, class: "scrolling" })}
      onMouseLeave={() => setClassOption({ id: null, class: "" })}
    >
      <span
        className={measureSizeText(i)}
        ref={classOption.id === i ? refText : null}
      >
        {option.name}
      </span>
    </div>
  ));
  return (
    <div className={"result__options_search"}>
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
    </div>
  );
};

export default OptionsSearch;

OptionsSearch.propTypes = {
  fontSizeOptions: PropTypes.string.isRequired,
  colorOptions: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  idOptions: PropTypes.string.isRequired,
  showOptions: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired,
  iconSearch: PropTypes.string.isRequired,
  setFocusSearch: PropTypes.func.isRequired,
};

OptionsSearch.defaultProps = {
  fontSizeOptions: "15px",
  colorOptions: "#4B4B4B",
  idOptions: "default",
  setValue: () => {},
  showOptions: () => {},
  setFocusSearch: () => {},
  iconSearch: "./images/action/search.svg",
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
