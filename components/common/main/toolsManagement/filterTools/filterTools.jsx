import React, { useCallback } from 'react';
const iconArrow = '/icons/arrow_dropdown.svg';
import storybook from '@talentumlab/storybook-design-system';
import styles from './filterTools.module.scss';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import { useAuth } from '@hooks/useAuth';
const iconSearch = '/icons/search_input.svg';

const FilterTools = ({ title, options, type }) => {
  const { user } = useAuth();
  const {
    idYearTool,
    idEjecutionTool,
    idDepartmentTool,
    idTownTool,
    idInstitutionTool,
    idSedeTool,
    idStateTool,
    unlockFilterTool,
    checkedAreaState,
    setCheckedAreaState,
    fetchAllTools,
  } = useStore((state) => ({
    idYearTool: state.idYearTool,
    idEjecutionTool: state.idEjecutionTool,
    idDepartmentTool: state.idDepartmentTool,
    idTownTool: state.idTownTool,
    idInstitutionTool: state.idInstitutionTool,
    idSedeTool: state.idSedeTool,
    idStateTool: state.idStateTool,
    unlockFilterTool: state.unlockFilterTool,
    checkedAreaState: state.checkedAreaState,
    setCheckedAreaState: state.setCheckedAreaState,
    fetchAllTools: state.fetchAllTools,
  }));
  // const onReset = (data) =>{
  // }

  const renderInitialValue = () => {
    const SET_VALUE = {
      0: idYearTool,
      1: idEjecutionTool,
      2: idDepartmentTool,
      3: idTownTool,
      4: idInstitutionTool,
      5: idSedeTool,
      6: idStateTool,
    };

    return SET_VALUE[type] ? SET_VALUE[type] : null;
  };

  const setId = useCallback(
    (value) => {
      unlockFilterTool(type, value, user);
      fetchAllTools(user);
    },
    [type, user, unlockFilterTool, fetchAllTools],
  );

  // useEffect(() => {
  //   if (type === 0 && options.length > 0) {
  //     setId(options.at(-1).id);
  //   }
  // }, [type, options, setId]);

  return (
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
  );
};

FilterTools.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownText: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.number.isRequired,
};

FilterTools.defaultProps = {
  title: '',
  dropdownText: '',
  options: [],
  type: 0,
};

export default FilterTools;
