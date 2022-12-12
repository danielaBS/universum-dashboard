import React, { useCallback } from 'react';
const iconArrow = '/icons/arrow_dropdown.svg';
import storybook from '@talentumlab/storybook-design-system';
import styles from './filterComponent.module.scss';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import { useAuth } from '@hooks/useAuth';
const iconSearch = '/icons/search_input.svg';

const FilterComponent = ({ title, options, type }) => {
  const { user } = useAuth();
  const {
    idYear,
    idEjecution,
    idDepartment,
    idTown,
    idInstitution,
    idSede,
    idState,
    fetchAllDashboardData,
    unlockFilter,
    checkedAreaState,
    setCheckedAreaState,
    cleanCheckedsReport,
  } = useStore((state) => ({
    idYear: state.idYear,
    idEjecution: state.idEjecution,
    idDepartment: state.idDepartment,
    idTown: state.idTown,
    idInstitution: state.idInstitution,
    idSede: state.idSede,
    idState: state.idState,
    fetchAllDashboardData: state.fetchAllDashboardData,
    unlockFilter: state.unlockFilter,
    checkedAreaState: state.checkedAreaState,
    setCheckedAreaState: state.setCheckedAreaState,
    cleanCheckedsReport: state.cleanCheckedsReport,
  }));
  // const onReset = (data) =>{
  // }

  const renderInitialValue = () => {
    const SET_VALUE = {
      0: idYear,
      1: idEjecution,
      2: idDepartment,
      3: idTown,
      4: idInstitution,
      5: idSede,
      6: idState,
    };

    return SET_VALUE[type] ? SET_VALUE[type] : null;
  };

  const setId = useCallback(
    (value) => {
      // setloading(true);
      unlockFilter(type, value, user);
      fetchAllDashboardData();
      cleanCheckedsReport();
    },
    [type, user, fetchAllDashboardData, unlockFilter, cleanCheckedsReport],
  );

  // useEffect(() => {
  //   if (type === 0 && options.length > 0) {
  //     setId(options.at(-1).id);
  //   }
  // }, [type, options, setId]);

  return (
    <>
      <div className={styles.title_dropdown}>
        <h5>{title}</h5>
        <div>
          {type !== 7 ? (
            <storybook.DropdownSearch
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
          ) : (
            <storybook.DropDownCheck
              width="auto"
              height="36px"
              srcDown={iconArrow}
              valueSelected={(info) => setId(info)}
              initialValue={checkedAreaState.filter((data) => data === true)}
              options={options.map((data) => ({
                id: data.id - 1,
                name: data.name,
              }))}
              disabled={options.length === 0 ? true : false}
              backgroundColor={options.length === 0 ? '#AEAEAE' : '#FFFFFF'}
              iconSearch={iconSearch}
              checkedState={checkedAreaState}
              setCheckedState={setCheckedAreaState}
            />
          )}
        </div>
      </div>
    </>
  );
};

FilterComponent.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownText: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.number.isRequired,
};

FilterComponent.defaultProps = {
  title: '',
  dropdownText: '',
  options: [],
  type: 0,
};

export default FilterComponent;
