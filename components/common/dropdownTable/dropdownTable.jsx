import React from 'react';
import styles from './dropdownTable.module.css';
import storybook from '@talentumlab/storybook-design-system';
const iconArrow = '/icons/arrow_dropdown.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const DropdownTable = (props) => {
  const { name, options, childrenActions } = props;

  const [show, setShow] = useState(false);

  const showOptionsDropdown = (value) => {
    setShow(value);
  };

  return (
    <>
      <div
        className={styles.dropdown__table}
        style={show ? { background: '#EBF8F9' } : { background: '#FFFFFF' }}
      >
        <div className={styles.dropdown__table_title}>{name}</div>
        <div className={styles.dropdown__table_items}>
          {childrenActions.map((childNode, index) => (
            <Fragment key={index}>{childNode}</Fragment>
          ))}
          <div
            className={styles.arrow}
            onClick={() => showOptionsDropdown(!show)}
            style={
              show
                ? { transform: 'rotate(180deg)' }
                : { transform: 'rotate(0deg)', marginTop: '-0.4rem' }
            }
          >
            <storybook.Image src={iconArrow} />
          </div>
        </div>
      </div>
      {show && (
        <div className={styles.dropdown__table_options}>
          {options.map((item, index) => (
            <div className={styles.dropdown__table_result} key={index}>
              <div>{item.title}:</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownTable;

DropdownTable.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  data: PropTypes.any.isRequired,
  childrenActions: PropTypes.node.isRequired,
};

DropdownTable.defaultProps = {
  name: '',
  options: [],
  data: {},
  childrenActions: <></>,
};
