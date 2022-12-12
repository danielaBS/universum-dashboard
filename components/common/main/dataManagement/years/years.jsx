import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './years.module.scss';
import TableYears from '@common/main/dataManagement/years/tableYears/tableYears';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add.svg';
// const iconDelete = '/icons/delete.svg';
import { useEffect, useState } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import { nameModals, columnsTableYear } from '@consts/index';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/index';
import TableYearsMobile from './tableYearsMobile/tableYearsMobile';
import MultipleChecks from '@common/multipleChecks/multipleChecks';

const Years = () => {
  const {
    listAllPeriodosGeneral,
    alertEditStatus,
    openModalState,
    searchByColumnYear,
    // isDeleteDataManagement,
    isCreateDataManagement,
    pageNumberDMYears,
    checkedTableExecutionState,
    setCheckedExecutionState,
  } = useStore(
    (state) => ({
      listAllPeriodosGeneral: state.listAllPeriodosGeneral,
      alertEditStatus: state.alertEditStatus,
      openModalState: state.openModalState,
      searchByColumnYear: state.searchByColumnYear,
      // isDeleteDataManagement: state.isDeleteDataManagement,
      isCreateDataManagement: state.isCreateDataManagement,
      pageNumberDMYears: state.pageNumberDMYears,
      checkedTableExecutionState: state.checkedTableExecutionState,
      setCheckedExecutionState: state.setCheckedExecutionState,
    }),
    shallow,
  );
  const { width } = useWindowSize();

  const [inputSearch, setInputSearch] = useState('');

  // const [rowNumber, setRowNumber] = useState(4);

  const searchByColumn = (column) => {
    const FILTER_SEARCH = {
      Año: column.title.toString().toLowerCase(),
      'Fecha de inicio': column.date_creation.toString().toLowerCase(),
      'Fecha de modificación': column.date_modification.toString().toLowerCase(),
      description: column.description.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnYear.id]
      ? FILTER_SEARCH[searchByColumnYear.id]
      : column.title.toString().toLowerCase();
  };

  const filteredYears = listAllPeriodosGeneral.filter((data) => {
    if (inputSearch.length >= 3) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllPeriodosGeneral;
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
    let arr = new Array(columnsTableYear.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    arr[4] = true;
    setCheckedExecutionState(arr);
  }, [setCheckedExecutionState]);

  // const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  const usersPerPage = 6;
  const pagesVisited = pageNumberDMYears * usersPerPage;
  const pageCount = Math.ceil(filteredYears.length / usersPerPage);
  const filteredListYears =
    filteredYears.length > 0 ? (
      filteredYears.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
        return content;
      })
    ) : (
      <div>No se encontraron datos</div>
    );

  // const valueSelected = (data) => {
  //   var rows = {
  //     'Mostrar: 1': 1,
  //     'Mostrar: 2': 2,
  //     'Mostrar: 3': 3,
  //     'Mostrar: 4': 4,
  //     5: 5,
  //   };
  //   setRowNumber(rows[data.value.name]);
  //   return rows[data.value.name] || rows[5];
  // };

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
            placeholder={`Buscar por ${searchByColumnYear.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableYear.map((data) => ({
                id: data.id,
                name: data.text,
              }))}
              checkedState={checkedTableExecutionState}
              setCheckedState={setCheckedExecutionState}
              iconSearch={iconSearch}
            />
          )}
        </div>
        <div className={styles.button_create}>
          {isCreateDataManagement && width >= BREAKPOINT && (
            <storybook.ButtonCommon
              text="CREAR"
              width="8rem"
              height="36px"
              showIcon
              iconButton={iconAdd}
              borderradius="5px"
              passedFunction={() => openModalState(nameModals.modalCreateYearState)}
            />
          )}
          {isCreateDataManagement && width <= BREAKPOINT && (
            <storybook.ButtonCommon
              text=""
              width="4rem"
              height="36px"
              showIcon
              iconButton={iconAdd}
              borderradius="5px"
              passedFunction={() => openModalState(nameModals.modalCreateYearState)}
            />
          )}
        </div>
      </section>
      <section className={styles.table__years}>
        {width >= BREAKPOINT ? (
          <TableYears list={filteredListYears} pageCount={pageCount} colNames={columnsTableYear} />
        ) : (
          <TableYearsMobile list={filteredListYears} pageCount={8} colNames={columnsTableYear} />
        )}
      </section>
    </>
  );
};

export default Years;
