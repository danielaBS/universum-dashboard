import React, { useEffect } from 'react';
import styles from './basicData.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
import FilterFormBasicData from '@common/main/toolsManagement/filterTools/filterFormBasicData';
import { filtersTools } from '@consts/filters';
import { useAuth } from '@hooks/useAuth';
import useDataFiltersForm from '@hooks/useDataFiltersForm';
import useYears from '@hooks/useYears';

const BasicData = ({ register, setListDataState }) => {
  const { years } = useYears();
  const {
    formEjecuciones,
    formDepartments,
    formTownsBy,
    formInstitutions,
    formSedes,
    formEstamentos,
  } = useDataFiltersForm();

  const { user } = useAuth();

  const {
    setValueBasicData,
    typeForm,
    fetchlistFormExecutionsByYear,
    fetchlistFormDepartments,
    fetchlistFormTownsByDepartment,
    fetchlistFormInstitutionsByTown,
    fetchlistFormSedeByInstitution,
    fetchAllFormEstamentosFilter,
    setIdStateForm,
    dataFormToEdit,
    toolState,
    valueParameter,
  } = useStore(
    (state) => ({
      setValueBasicData: state.setValueBasicData,
      typeForm: state.typeForm,
      fetchlistFormExecutionsByYear: state.fetchlistFormExecutionsByYear,
      fetchlistFormDepartments: state.fetchlistFormDepartments,
      fetchlistFormTownsByDepartment: state.fetchlistFormTownsByDepartment,
      fetchlistFormInstitutionsByTown: state.fetchlistFormInstitutionsByTown,
      fetchlistFormSedeByInstitution: state.fetchlistFormSedeByInstitution,
      fetchAllFormEstamentosFilter: state.fetchAllFormEstamentosFilter,
      setIdStateForm: state.setIdStateForm,
      dataFormToEdit: state.dataFormToEdit,
      toolState: state.toolState,
      valueParameter: state.valueParameter,
    }),
    shallow,
  );

  useEffect(() => {
    if (typeForm === 'edit' && dataFormToEdit) {
      //Ejecuciones
      fetchlistFormExecutionsByYear({
        value: { id: dataFormToEdit.year[0].idYear, name: dataFormToEdit.year[0].title },
        id: '',
      });

      //Departamentos
      fetchlistFormDepartments(
        {
          value: {
            id: dataFormToEdit.ejecution[0].ejecucionId,
            name: dataFormToEdit.ejecution[0].name_aplication,
          },
          id: '',
        },
        user,
      );
      //Municipios
      fetchlistFormTownsByDepartment(
        {
          value: {
            id: dataFormToEdit.department[0].idDepartment,
            name: dataFormToEdit.department[0].department_name,
          },
          id: '',
        },
        user,
      );
      //Instituciones
      fetchlistFormInstitutionsByTown(
        {
          value: {
            id: dataFormToEdit.town[0].idTown,
            name: dataFormToEdit.town[0].town_name,
          },
          id: '',
        },
        user,
      );

      fetchlistFormSedeByInstitution(
        {
          value: {
            id: dataFormToEdit.institution[0].idInstitution,
            name: dataFormToEdit.institution[0].name_institution,
          },
          id: '',
        },
        user,
      );

      fetchAllFormEstamentosFilter(
        {
          value: {
            id: dataFormToEdit.sede[0].idSede,
            name: dataFormToEdit.sede[0].name_sede,
          },
          id: '',
        },
        toolState,
      );

      setValueBasicData(1, {
        id: dataFormToEdit.ejecution[0].ejecucionId,
        name: dataFormToEdit.ejecution[0].name_aplication,
      });
      setValueBasicData(4, {
        id: dataFormToEdit.institution[0].idInstitution,
        name: dataFormToEdit.institution[0].name_institution,
      });
      setValueBasicData(5, {
        id: dataFormToEdit.sede[0].idSede,
        name: dataFormToEdit.sede[0].name_sede,
      });
      setValueBasicData(6, {
        id: dataFormToEdit.state[0].idState,
        name: dataFormToEdit.state[0].name_state,
      });

      setIdStateForm({
        value: {
          id: dataFormToEdit.state[0].idState,
          name: dataFormToEdit.state[0].name_state,
        },
        id: '',
      });
    }
  }, [
    typeForm,
    fetchlistFormExecutionsByYear,
    fetchlistFormDepartments,
    fetchlistFormTownsByDepartment,
    fetchlistFormInstitutionsByTown,
    fetchlistFormSedeByInstitution,
    fetchAllFormEstamentosFilter,
    setIdStateForm,
    setValueBasicData,
    dataFormToEdit,
    toolState,
    user,
  ]);

  const renderOptions = (id) => {
    const SET_OPTIONS = {
      0: years,
      1: formEjecuciones,
      2: formDepartments,
      3: formTownsBy,
      4: formInstitutions,
      5: formSedes,
      6: formEstamentos,
    };
    return SET_OPTIONS[id] ? SET_OPTIONS[id] : null;
  };

  useEffect(() => {
    if (typeForm === 'edit' && dataFormToEdit) {
      const entries = Object.entries(dataFormToEdit.answers[0]);
      setListDataState(entries);
      // console.log('entra');
    }
  }, [typeForm, dataFormToEdit, setListDataState]);

  return (
    <div className={styles.basic__data}>
      <div>
        <div className={styles.basic__data_row}>
          <label>
            <span style={{ color: 'red' }}>*</span>Año
          </label>
        </div>
        <div className={styles.basic__data_row}>
          <label>
            <span style={{ color: 'red' }}>*</span>Ejecución
          </label>
        </div>
        <div className={styles.basic__data_row}>
          <label>
            <span style={{ color: 'red' }}>*</span>Departamento
          </label>
        </div>
        <div className={styles.basic__data_row}>
          <label>
            <span style={{ color: 'red' }}>*</span>Municipio
          </label>
        </div>
        <div className={styles.basic__data_row}>
          <label>
            <span style={{ color: 'red' }}>*</span>Institución
          </label>
        </div>
        {valueParameter.stateSede && (
          <div className={styles.basic__data_row}>
            <label>
              <span style={{ color: 'red' }}>*</span>Sede
            </label>
          </div>
        )}
        <div className={styles.basic__data_row}>
          <label>
            <span style={{ color: 'red' }}>*</span>Estamento
          </label>
        </div>
        {valueParameter.stateFirstName && (
          <div className={styles.basic__data_row}>
            <label>Nombre</label>
          </div>
        )}
        {valueParameter.stateLastName && (
          <div className={styles.basic__data_row}>
            <label>Apellido</label>
          </div>
        )}
      </div>
      <div>
        {filtersTools
          .filter((info) => {
            return valueParameter.stateSede ? info : info.name !== 'Sedes';
          })
          .map((data, index) => (
            <div className={styles.basic__data_input_drop} key={index}>
              <FilterFormBasicData
                title={data.name}
                dropdownText={'Todos'}
                options={renderOptions(data.id) || []}
                type={data.id}
              />
            </div>
          ))}

        {valueParameter.stateFirstName && (
          <div className={styles.basic__data_input}>
            <storybook.Input
              isLabel={false}
              placeholder={''}
              id="name"
              register={register}
              onChange={(e) => setValueBasicData('nameData', e)}
            />
          </div>
        )}
        {valueParameter.stateLastName && (
          <div className={styles.basic__data_input}>
            <storybook.Input
              isLabel={false}
              placeholder={''}
              id="lastname"
              register={register}
              onChange={(e) => setValueBasicData('lastName', e)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicData;

BasicData.propTypes = {
  register: PropTypes.func.isRequired,
  setListDataState: PropTypes.func.isRequired,
};

BasicData.defaultProps = {
  register: () => {},
  setListDataState: () => {},
};
