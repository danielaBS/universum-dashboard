import React, { useCallback } from 'react';
const iconArrow = '/icons/arrow_dropdown.svg';
import storybook from '@talentumlab/storybook-design-system';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import { useAuth } from '@hooks/useAuth';
const iconSearch = '/icons/search_input.svg';
import styles from './filterFormBasicData.module.scss';

// const basicDataMock = {
//   year: { idYearForm: 1, title: '2022' },
//   ejecution: { id: 1, name: 'Nombre de la Ejecución' },
//   department: { id: 1, name: 'CAUCA' },
//   town: { id: 1, name: 'POPAYAN' },
//   institution: { id: 1, name: 'IE Nombre de la Ie' },
//   sede: { id: 1, name: 'Sede_de_popayan' },
//   estamento: { id: 1, name: 'Estudiantes' },
// };

const FilterFormBasicData = ({ options, type }) => {
  const { user } = useAuth();
  const {
    idYearForm,
    idEjecutionForm,
    idDepartmentForm,
    idTownForm,
    idInstitutionForm,
    idSedeForm,
    idStateForm,
    unlockFilterForm,
    setValueBasicData,
  } = useStore((state) => ({
    idYearForm: state.idYearForm,
    idEjecutionForm: state.idEjecutionForm,
    idDepartmentForm: state.idDepartmentForm,
    idTownForm: state.idTownForm,
    idInstitutionForm: state.idInstitutionForm,
    idSedeForm: state.idSedeForm,
    idStateForm: state.idStateForm,
    unlockFilterForm: state.unlockFilterForm,
    setValueBasicData: state.setValueBasicData,
  }));
  // const onReset = (data) =>{
  // }

  const renderInitialValue = () => {
    const SET_VALUE = {
      0: idYearForm,
      1: idEjecutionForm,
      2: idDepartmentForm,
      3: idTownForm,
      4: idInstitutionForm,
      5: idSedeForm,
      6: idStateForm,
    };

    return SET_VALUE[type] ? SET_VALUE[type] : null;
  };

  const setId = useCallback(
    (value) => {
      unlockFilterForm(type, value, user);
      setValueBasicData(type, value.value);
      //   fetchAllDashboardData();
    },
    [type, user, unlockFilterForm, setValueBasicData],
  );

  return (
    <div className={styles.drops_form_basic}>
      <storybook.DropdownSearch
        // minWidth="4rem"
        width="100%"
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

FilterFormBasicData.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownText: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.number.isRequired,
};

FilterFormBasicData.defaultProps = {
  title: '',
  dropdownText: '',
  options: [],
  type: 0,
};

export default FilterFormBasicData;
