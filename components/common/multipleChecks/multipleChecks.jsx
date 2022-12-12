import React, { useEffect, useState } from 'react';
import storybook from '@talentumlab/storybook-design-system';
import PropTypes from 'prop-types';
import styles from './multipleChecks.module.css';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconFilter = '/icons/filter_table.svg';
// import Options from "../options/options";
// import iconArrow from "../../../images/arrow_dropdown.svg";
import OptionsMultupleChecks from './optionsMultipleChecks/optionsMultupleChecks';

const MultipleChecks = (props) => {
  const {
    fontSize,
    // initialValue,
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
    checkedState,
    setCheckedState,
  } = props;

  // const [valueDropdown, setValueDropdown] = useState(initialValue);
  const [focusSearch, setFocusSearch] = useState(false);
  const [focusCheck, setFocusCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);

  const optionSelected = (value) => {
    // setValueDropdown(value);
    valueSelected(value);
  };

  useEffect(() => {
    if (!show && focusSearch && !focusCheck) {
      setFocus(true);
    } else if (show && !focusSearch && !focusCheck) {
      setFocus(true);
    } else if (show && focusSearch && !focusCheck) {
      setFocus(true);
    } else if (show && !focusSearch && focusCheck) {
      setFocus(true);
    } else if (!show && !focusSearch && focusCheck) {
      setFocus(true);
    } else if (show && focusSearch && focusCheck) {
      setFocus(true);
    } else if (!show && focusSearch && focusCheck) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [show, focusSearch, focusCheck]);

  // useEffect(() => {
  //   setValueDropdown(initialValue);
  // }, [initialValue]);

  useEffect(() => {
    if (disabled) {
      setFocus(false);
      setShow(false);
      setFocusSearch(false);
    }
  }, [disabled]);

  return (
    <div className={styles.container_dropDownCheck}>
      <div
        className={styles.container_fitler_table}
        style={{
          //   width: width,
          //   minWidth: minWidth,
          fontSize: fontSize,
          //   height: height,
          //   backgroundColor: backgroundColor,
          marginBottom: `${dropdownGap}rem`,
          //   opacity: disabled ? 0.2 : 1,
        }}
        tabIndex={index}
        onClick={() => {
          setShow(!show);
          setFocusCheck(false);
        }}
        // onFocus={() => (!disabled ? setShow(true) : null)}
        onBlur={() => {
          keepOpen
            ? setShow(true)
            : setTimeout(() => {
                // console.log('entra');
                setShow(false);
                //   setFocusCheck(false);
              }, 170);
        }}
      >
        <div className={styles.fitler_table}>
          <div>
            <storybook.Image src={iconFilter} />
          </div>
          <div>
            <storybook.Image src={iconArrow} />
          </div>
        </div>

        <input id={index} style={{ display: 'none' }} />
      </div>
      {focus && !disabled && (
        <OptionsMultupleChecks
          setValue={optionSelected}
          showOptions={(value) => setShow(value)}
          options={options}
          colorOptions={colorOptions}
          idOptions={idOptions}
          fontSizeOptions={fontSizeOptions}
          setFocusSearch={(value) => setFocusSearch(value)}
          setFocusCheck={(value) => setFocusCheck(value)}
          iconSearch={iconSearch}
          checkedState={checkedState}
          setCheckedState={setCheckedState}
        />
      )}
    </div>
  );
};

export default MultipleChecks;

MultipleChecks.propTypes = {
  minWidth: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  srcDown: PropTypes.string,
  srcUp: PropTypes.string,
  initialValue: PropTypes.array,
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

MultipleChecks.defaultProps = {
  minWidth: '2rem',
  width: '15rem',
  height: '2.5rem',
  fontSize: '13px',
  backgroundColor: '#FFFFFF',
  textColor: '#4B4B4B',
  index: 0,
  className: null,
  initialValue: [],
  dropdownGap: 1,
  keepOpen: false,
  disabled: false,
  srcDown: './images/action/arrow_dropdown.svg',
  iconSearch: './images/action/search.svg',
  onReset: () => {
    // console.log("This function is called when is focussed");
  },
  onFocus: () => {
    // console.log("This function is called when is focussed");
  },
  onBlur: () => {
    // console.log("This function is called when is blurred");
  },
  fontSizeOptions: '13px',
  colorOptions: '#4B4B4B',
  idOptions: 'default',
  valueSelected: () => {},
  options: [
    {
      id: 1,
      name: 'Option 1',
    },
    {
      id: 2,
      name: 'Option 2',
    },
    {
      id: 3,
      name: 'Option 3',
    },
    {
      id: 4,
      name: 'Option 4',
    },
    {
      id: 5,
      name: 'Option 5',
    },
    {
      id: 6,
      name: 'Option 6',
    },
    {
      id: 7,
      name: 'Option 7',
    },
  ],
};
