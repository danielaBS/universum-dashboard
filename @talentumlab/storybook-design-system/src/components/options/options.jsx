import React from "react";
import PropTypes from "prop-types";
import "./options.module.css";

const Options = (props) => {
  const {
    options,
    fontSizeOptions,
    colorOptions,
    setValue,
    showOptions,
    classNameOptions,
    idOptions,
  } = props;

  const optionSelected = (infoOption, optionId) => {
    setValue({ value: infoOption, id: optionId });
    showOptions(false);
  };

  let divOptions = options.map((option, i) => (
    <div
      key={i}
      className="result__options--value"
      style={{ fontSize: fontSizeOptions, color: colorOptions }}
      onClick={() =>
        optionSelected({ id: option.id, name: option.name }, idOptions)
      }
    >
      <div>{option.name}</div>
    </div>
  ));

  return (
    <div className={`result__options ${classNameOptions}`}>{divOptions}</div>
  );
};

export default Options;

Options.propTypes = {
  classNameOptions: PropTypes.string,
  fontSizeOptions: PropTypes.string.isRequired,
  colorOptions: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  idOptions: PropTypes.string.isRequired,
  showOptions: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired,
};

Options.defaultProps = {
  classNameOptions: null,
  fontSizeOptions: "13px",
  colorOptions: "#4B4B4B",
  idOptions: "default",
  setValue: () => {},
  showOptions: () => {},
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
