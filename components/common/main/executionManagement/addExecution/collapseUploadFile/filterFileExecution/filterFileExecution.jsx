import React, { useCallback } from 'react';
const iconArrow = '/icons/arrow_dropdown.svg';
import storybook from '@talentumlab/storybook-design-system';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import { useAuth } from '@hooks/useAuth';
const iconSearch = '/icons/search_input.svg';
import styles from './filterFileExecution.module.scss';

const FilterFileExecution = ({ title, options, type }) => {
  const { user } = useAuth();
  const {
    idYear,
    idEjecution,
    idDepartmentExecution,
    idTownExecution,
    idInstitutionExecution,
    idSedeExecution,
    idState,
    unlockFilterExecution,
  } = useStore((state) => ({
    idYear: state.idYear,
    idEjecution: state.idEjecution,
    idDepartmentExecution: state.idDepartmentExecution,
    idTownExecution: state.idTownExecution,
    idInstitutionExecution: state.idInstitutionExecution,
    idSedeExecution: state.idSedeExecution,
    idState: state.idState,
    unlockFilterExecution: state.unlockFilterExecution,
  }));
  // const onReset = (data) =>{
  // }

  const renderInitialValue = () => {
    const SET_VALUE = {
      0: idYear,
      1: idEjecution,
      2: idDepartmentExecution,
      3: idTownExecution,
      4: idInstitutionExecution,
      5: idSedeExecution,
      6: idState,
    };

    return SET_VALUE[type] ? SET_VALUE[type] : null;
  };

  const setId = useCallback(
    (value) => {
      unlockFilterExecution(type, value, user);
      //   fetchAllDashboardData();
    },
    [type, user, unlockFilterExecution],
  );

  return (
    <div className={styles.title_dropdown}>
      <div style={{ display: 'flex' }}>
        <span style={{ color: 'red' }}>*</span>
        <h5>{title}</h5>
      </div>
      <storybook.DropdownSearch
        minWidth="10rem"
        width="auto"
        height="36px"
        srcDown={iconArrow}
        valueSelected={(info) => setId(info)}
        initialValue={renderInitialValue()}
        options={options}
        disabled={options.length === 0 ? true : false}
        backgroundColor={options.length === 0 ? '#c8c8c8' : '#FFFFFF'}
        iconSearch={iconSearch}
      />
    </div>
  );
};
export default FilterFileExecution;

FilterFileExecution.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownText: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.number.isRequired,
};

FilterFileExecution.defaultProps = {
  title: '',
  dropdownText: '',
  options: [],
  type: 0,
};
