import React from 'react';
import PropTypes from 'prop-types';

const CheckboxList = ({ onChange, checked, idCheckbox }) => {
  return (
    <input
      type="checkbox"
      name={idCheckbox}
      id={idCheckbox}
      checked={checked}
      onChange={() => onChange(idCheckbox)}
    />
  );
};

export default CheckboxList;

CheckboxList.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  idCheckbox: PropTypes.any.isRequired,
};

CheckboxList.defaultProps = {
  onChange: () => {},
  checked: false,
  idCheckbox: 'any',
};
