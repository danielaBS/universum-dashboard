import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { listQuestionForm1 } from '@consts/index';
// import { useEffect } from 'react';

const InputRadio = ({
  value,
  quest,
  onChange,
  list,
  checked,
  label,
  id,
  // setCheckedState,
  // checkedState
}) => {
  //   const [gender, setGender] = useState({ id: '', value: '' });
  //   const [isChecked, setIsChecked] = useState(false);

  const [checkedState, setCheckedState] = useState(new Array(list.length).fill(false));

  // useEffect(() => {
  //   if (checked.id === quest.text) {
  //     setCheckedState(new Array(list.length).fill(false));
  //   }
  // }, [checked, checkedState, list]);

  const handleChange = (event) => {
    console.log(checked.id, quest.text);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === parseInt(checked.idIndex) ? value : item,
    );
    // console.log(updatedCheckedState);
    // if (checked.id === quest.text.toString()) {
    //   setCheckedState(event.target.value);
    //   onChange(event.target.value, quest);
    // }
    setCheckedState(updatedCheckedState);
    onChange(event.target.value, quest);

    // console.log(updatedCheckedState);

    // console.log(updatedCheckedState.findIndex((element) => element === true));

    // const arrayMapped = updatedCheckedState.map((item, index) => {
    //   if (item) {
    //     return list[index];
    //   }
    // });

    // console.log(arrayMapped);
    // const arrayFiltered = arrayMapped.filter((item) => (item ? item : null));
    // setGender(arrayFiltered[0]);
  };

  // const isCheked = () => {
  //   if (checked.id === quest.text.toString()) {
  //     //   console.log('entra');
  //     return (
  //       checkedState[checked.idIndex] === value
  //       // && value === quest.text.toString()
  //     );
  //   } else {
  //     return false;
  //   }
  //   // console.log('no entra');
  // };

  return (
    <>
      <input
        type="radio"
        id={id}
        value={value}
        checked={list[checked.idIndex][1] === value}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default InputRadio;

InputRadio.propTypes = {
  value: PropTypes.any.isRequired,
  checked: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  quest: PropTypes.any.isRequired,
  checkedState: PropTypes.any.isRequired,
  setCheckedState: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.any,
};

InputRadio.defaultProps = {
  value: '',
  id: '',
  checked: [{ id: '', value: 0 }],
  onChange: () => {},
  list: [],
  quest: 0,
  checkedOption: [],
  setCheckedState: () => {},
  label: 'Test',
};
