import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './executions.module.scss';
import TableExecutions from '@common/main/executionManagement/executions/tableExecutions/tableExecutions';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add.svg';
const iconArrow = '/icons/arrow_dropdown.svg';
import { useState, useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT, columnsTableExecutions } from '@consts/index';
import TableExecutionsMobile from './tableExecutionsMobile/tableExecutionsMobile';
import { scrollToTop } from '@hooks/scrollToTop';
import MultipleChecks from '@common/multipleChecks/multipleChecks';

const Executions = () => {
  const {
    listAllExecutions,
    alertEditStatus,
    setViewExecution,
    searchByColumnExecution,
    isCreateExecution,
    checkedTableExecutionState,
    setCheckedExecutionState,
    pageNumberExecutions,
    setPageNumberExecutions,
    cleanFiltersExecution,
  } = useStore(
    (state) => ({
      listAllExecutions: state.listAllExecutions,
      alertEditStatus: state.alertEditStatus,
      setViewExecution: state.setViewExecution,
      searchByColumnExecution: state.searchByColumnExecution,
      isCreateExecution: state.isCreateExecution,
      checkedTableExecutionState: state.checkedTableExecutionState,
      setCheckedExecutionState: state.setCheckedExecutionState,
      pageNumberExecutions: state.pageNumberExecutions,
      setPageNumberExecutions: state.setPageNumberExecutions,
      cleanFiltersExecution: state.cleanFiltersExecution,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  useEffect(() => {
    scrollToTop();
  }, []);

  const [inputSearch, setInputSearch] = useState('');
  const [rowNumber, setRowNumber] = useState(4);

  const searchByColumn = (column) => {
    const FILTER_SEARCH = {
      Id: column.idEjecution.toString().toLowerCase(),
      Título: column.name_aplication.toString().toLowerCase(),
      Año: column.title.toString().toLowerCase(),
      Descripción: column.description && column.description.toString().toLowerCase(),
      'Fecha de inicio': column.date_creation.toString().toLowerCase(),
      'Fecha de fin': column.date_end.toString().toLowerCase(),
      Estado: column.state.toString().toLowerCase(),
      Usuario: column.username && column.username.toString().toLowerCase(),
      'Fecha creación': column.date_creation.toString().toLowerCase(),
      'Fecha modificación': column.date_modification.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnExecution.text]
      ? FILTER_SEARCH[searchByColumnExecution.text]
      : column.name_aplication.toString().toLowerCase();
  };

  const filteredExecutions = listAllExecutions.filter((data) => {
    if (inputSearch.length >= 2) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllExecutions;
    }
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  useEffect(() => {
    let arr = new Array(columnsTableExecutions.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    arr[4] = true;
    arr[5] = true;
    arr[6] = true;
    setCheckedExecutionState(arr);
  }, [setCheckedExecutionState]);

  const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  // const usersPerPage = 6;
  const pagesVisited = pageNumberExecutions * usersPerPage;
  const pageCount = Math.ceil(filteredExecutions.length / usersPerPage);
  const filteredListExecutionsPaginate =
    filteredExecutions.length > 0 ? (
      filteredExecutions.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
        return content;
      })
    ) : (
      <div>No se encontraron datos</div>
    );

  const [reset, setReset] = useState(false);

  const valueSelected = (data) => {
    setReset(true);
    var rows = {
      'Mostrar: 1': 1,
      'Mostrar: 2': 2,
      'Mostrar: 3': 3,
      'Mostrar: 4': 4,
    };
    setRowNumber(rows[data.value.name]);
    return rows[data.value.name] || null;
  };
  return (
    <>
      <section className={styles.actions__year}>
        <div>
          <storybook.Search
            leftIcon
            srcIcon={iconSearch}
            inputWidth={width >= BREAKPOINT ? '20rem' : '100%'}
            inputHeight={'36px'}
            onChange={handleChange}
            placeholder={`Buscar por ${searchByColumnExecution.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableExecutions.map((data) => ({
                id: data.id,
                name: data.text,
              }))}
              checkedState={checkedTableExecutionState}
              setCheckedState={setCheckedExecutionState}
              iconSearch={iconSearch}
            />
          )}
        </div>
        <div>
          {isCreateExecution && (
            <storybook.ButtonCommon
              text="Crear"
              width="7rem"
              height="36px"
              showIcon
              iconButton={iconAdd}
              borderradius="5px"
              passedFunction={() => {
                setViewExecution(1);
                cleanFiltersExecution();
              }}
            />
          )}
          <div>
            <storybook.DropDownV2
              width="auto"
              srcDown={iconArrow}
              valueSelected={valueSelected}
              height="36px"
              initialValue={{
                value: {
                  id: 0,
                  name: width >= BREAKPOINT ? 'Mostrar: ' + rowNumber : rowNumber,
                },
                id: 'Mostrar: ' + rowNumber,
              }}
              options={[
                { id: 0, name: 'Mostrar: 1' },
                { id: 1, name: 'Mostrar: 2' },
                { id: 2, name: 'Mostrar: 3' },
                { id: 3, name: 'Mostrar: 4' },
              ]}
            />
          </div>
        </div>
      </section>
      <section className={styles.table__years}>
        {width >= BREAKPOINT ? (
          <TableExecutions
            list={filteredListExecutionsPaginate}
            colNames={columnsTableExecutions}
            pageCount={pageCount}
            setPageNumber={setPageNumberExecutions}
            reset={reset}
            setReset={setReset}
          />
        ) : (
          <TableExecutionsMobile
            list={filteredListExecutionsPaginate}
            pageCount={pageCount}
            setPageNumber={setPageNumberExecutions}
            reset={reset}
            setReset={setReset}
          />
        )}
      </section>
    </>
  );
};

export default Executions;
