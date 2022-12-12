import React from 'react';
import styles from './tools.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import useDataFilters from '@hooks/useDataFilters';
import TableTools from '../tableTools/tableTools';
import { useEffect } from 'react';
import { BREAKPOINT, columnsTableTools, filtersTools } from '@consts/index';
const iconSearch = '/icons/search.svg';
const iconRefresh = '/icons/clean.svg';
const iconAdd = '/icons/add_blue.svg';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import useWindowSize from '@hooks/useWindowSize';
import { useState } from 'react';
import FilterTools from '../filterTools/filterTools';
import useDataFiltersTool from '@hooks/useDataFiltersTool';
import MultipleChecks from '@common/multipleChecks/multipleChecks';
const iconDashboard = '/images/Mascotas-02.png';
import { scrollToTop } from '@hooks/scrollToTop';
import { useAuth } from '@hooks/useAuth';

const Tools = () => {
  const { years } = useDataFilters();
  const { user } = useAuth();

  const {
    toolEjecuciones,
    toolDepartments,
    toolTownsBy,
    toolInstitutions,
    toolSedes,
    toolEstamentos,
  } = useDataFiltersTool();

  const {
    listAllTools,
    alertEditStatus,
    setToolState,
    searchByColumnTool,
    fetchAllTools,
    // toolState,
    setViewTool,
    setTypeForm,
    cleanFiltersTool,
    cleanFiltersForm,
    checkedTableToolState,
    setCheckedTableToolState,
    isCreateTool1,
    isCreateTool2,
    setCleanBasicData,
    valueParameter,
  } = useStore(
    (state) => ({
      listAllTools: state.listAllTools,
      alertEditStatus: state.alertEditStatus,
      setToolState: state.setToolState,
      searchByColumnTool: state.searchByColumnTool,
      fetchAllTools: state.fetchAllTools,
      // toolState: state.toolState,
      setViewTool: state.setViewTool,
      setTypeForm: state.setTypeForm,
      cleanFiltersTool: state.cleanFiltersTool,
      cleanFiltersForm: state.cleanFiltersForm,
      checkedTableToolState: state.checkedTableToolState,
      setCheckedTableToolState: state.setCheckedTableToolState,
      isCreateTool1: state.isCreateTool1,
      isCreateTool2: state.isCreateTool2,
      setCleanBasicData: state.setCleanBasicData,
      valueParameter: state.valueParameter,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  const [inputSearch, setInputSearch] = useState('');

  const idCuestionario = (col) =>
    col.Formulario === 'Formulario 1'
      ? col.idCuestionarioA.toString().toLowerCase()
      : col.idCuestionarioB.toString().toLowerCase();

  const searchByColumn = (column) => {
    const FILTER_SEARCH = {
      Id: idCuestionario(column),
      Formulario: column.Formulario.toString().toLowerCase(),
      Ejecución: column.name_aplication.toString().toLowerCase(),
      Año: column.title.toString().toLowerCase(),
      'Fecha creación': column.date_creation.toString().toLowerCase(),
      'Fecha modificación': column.date_modification.toString().toLowerCase(),
      Departamento: column.department_name.toString().toLowerCase(),
      Municipio: column.town_name.toString().toLowerCase(),
      Institución: column.name_institution.toString().toLowerCase(),
      Sede: column.name_sede.toString().toLowerCase(),
      Estamento: column.name_state.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnTool.text]
      ? FILTER_SEARCH[searchByColumnTool.text]
      : column.Formulario.toString().toLowerCase();
  };

  const filteredTools = listAllTools.filter((data) => {
    if (inputSearch.length >= 2) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllTools;
    }
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  const handleStateForm = (id) => {
    setToolState(id);
    fetchAllTools(user);
    setViewTool(1);
    setTypeForm('create');
    cleanFiltersTool(user);
    cleanFiltersForm(user);
    setCleanBasicData();
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  useEffect(() => {
    setToolState(0);
  }, [setToolState]);

  useEffect(() => {
    scrollToTop();
  }, []);

  // useEffect(() => {
  //   console.log(checkedTableToolState);
  // }, [checkedTableToolState]);

  useEffect(() => {
    let arr = new Array(columnsTableTools.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    arr[4] = true;
    arr[5] = true;
    setCheckedTableToolState(arr);
  }, [setCheckedTableToolState]);

  const renderOptions = (id) => {
    const SET_OPTIONS = {
      0: years,
      1: toolEjecuciones,
      2: toolDepartments,
      3: toolTownsBy,
      4: toolInstitutions,
      5: toolSedes,
      6: toolEstamentos,
    };
    return SET_OPTIONS[id] ? SET_OPTIONS[id] : null;
  };

  return (
    <div className={styles.container__tools}>
      <div className={styles.filters}>
        <h2 style={{fontSize:'24px'}}>Herramientas</h2>
        <section className={styles.actions__filters}>
          <storybook.ButtonCommon
            text="LIMPIAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            passedFunction={() => cleanFiltersTool(user)}
            showIcon
            iconButton={iconRefresh}
          />
        </section>
        <div className={styles.filters__container}>
          <div className={styles.filters__content}>
            <div className={styles.filter_group}>
              {filtersTools
                .filter((info) => {
                  return valueParameter.stateSede ? info : info.name !== 'Sedes';
                })
                .filter((fil) => fil.id === 2 || fil.id === 3 || fil.id === 4 || fil.id === 5)
                .map((data, index) => (
                  <FilterTools
                    key={index}
                    title={data.name}
                    dropdownText={'Todos'}
                    options={renderOptions(data.id) || []}
                    type={data.id}
                  />
                ))}
            </div>
            <div className={styles.line}></div>
            <div className={styles.filter_group} style={{ flexDirection: 'column' }}>
              {filtersTools
                .filter((fil) => fil.id === 0 || fil.id === 1)
                .map((data, index) => (
                  <FilterTools
                    key={index}
                    title={data.name}
                    dropdownText={'Todos'}
                    options={renderOptions(data.id) || []}
                    type={data.id}
                  />
                ))}
            </div>
            <div className={styles.line}></div>
            <div className={styles.filter_group} style={{ flexDirection: 'column' }}>
              {filtersTools
                .filter((fil) => fil.id === 6 || fil.id === 7)
                .map((data, index) => (
                  <FilterTools
                    key={index}
                    title={data.name}
                    dropdownText={'Seleccionar'}
                    options={renderOptions(data.id) || []}
                    type={data.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <main className={styles.tool_management}>
        <section
          className={styles.actions__table}
          style={
            listAllTools.length > 0
              ? { justifyContent: 'space-between' }
              : { justifyContent: 'flex-end' }
          }
        >
          {listAllTools.length > 0 ? (
            <div>
              <storybook.Search
                leftIcon
                srcIcon={iconSearch}
                inputWidth={width >= BREAKPOINT ? '90%' : '100%'}
                inputHeight={'36px'}
                onChange={handleChange}
                placeholder={`Buscar por ${searchByColumnTool.text.toLowerCase()}`}
              />
              <MultipleChecks
                width="auto"
                // valueSelected={(info) => console.log(info)}
                initialValue={checkedTableToolState.filter((data) => data === true)}
                options={columnsTableTools.map((data) => ({
                  id: data.id,
                  name: data.text,
                }))}
                checkedState={checkedTableToolState}
                setCheckedState={setCheckedTableToolState}
                iconSearch={iconSearch}
              />
            </div>
          ) : null}
          <div className={styles.buttons_cuestionarios}>
            <div>
              {isCreateTool1 && (
                <storybook.ButtonCommon
                  text="CUESTIONARIO 1"
                  width="10.8rem"
                  height="36px"
                  fontSize="14px"
                  showIcon
                  iconButton={iconAdd}
                  borderradius="5px"
                  border="1px solid #00A4AD"
                  color="#00A4AD"
                  bgColor="transparent"
                  passedFunction={() => handleStateForm(1)}
                />
              )}
            </div>
            <div>
              {isCreateTool2 && (
                <storybook.ButtonCommon
                  text="CUESTIONARIO 2"
                  width="10.8rem"
                  height="36px"
                  fontSize="14px"
                  showIcon
                  iconButton={iconAdd}
                  borderradius="5px"
                  border="1px solid #00A4AD"
                  color="#00A4AD"
                  bgColor="transparent"
                  passedFunction={() => handleStateForm(2)}
                />
              )}
            </div>
          </div>
        </section>
        {listAllTools.length > 0 ? (
          <section className={styles.table__years}>
            {width >= BREAKPOINT ? (
              <TableTools list={filteredTools} colNames={columnsTableTools} />
            ) : (
              <TableTools list={filteredTools} colNames={columnsTableTools} />
            )}
          </section>
        ) : (
          <div className={styles.title}>
            <img width="15%"src={iconDashboard} />
            <div style={{ padding: '1.5rem' }}>
              No hay información para los campos filtrados, seleccione los filtros
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tools;
