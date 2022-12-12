import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './departments.module.scss';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add.svg';
// const iconArrow = '/icons/arrow_dropdown.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
// import TableAreasMobile from './tableAreasMobile/tableAreasMobile';
import { BREAKPOINT, nameModals, columnsTableDepartments } from '@consts/index';
import useWindowSize from '@hooks/useWindowSize';
import TableDepartments from './tableDepartments/tableDepartments';
import TableDepartmentsMobile from './tableDepartmentsMobile/tableDepartmentsMobile';
import MultipleChecks from '@common/multipleChecks/multipleChecks';

const Departments = () => {
  const {
    listAllDepartments,
    alertEditStatus,
    isCreateDataManagement,
    openModalState,
    searchByColumnDepartment,
    pageNumberDMDepartments,
    checkedTableExecutionState,
    setCheckedExecutionState,
  } = useStore(
    (state) => ({
      listAllDepartments: state.listAllDepartments,
      alertEditStatus: state.alertEditStatus,
      isCreateDataManagement: state.isCreateDataManagement,
      openModalState: state.openModalState,
      searchByColumnDepartment: state.searchByColumnDepartment,
      pageNumberDMDepartments: state.pageNumberDMDepartments,
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
      ID: column.idDepartment.toString().toLowerCase(),
      Nombre: column.department_name.toString().toLowerCase(),
      'Fecha de inicio': column.date_creation.toString().toLowerCase(),
      'Fecha de modificación': column.date_modification.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnDepartment.text]
      ? FILTER_SEARCH[searchByColumnDepartment.text]
      : column.department_name.toString().toLowerCase();
  };

  const filteredDepartments = listAllDepartments.filter((data) => {
    if (inputSearch.length >= 1) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllDepartments;
    }
  });

  // const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  const usersPerPage = 6;
  const pagesVisited = pageNumberDMDepartments * usersPerPage;
  const pageCount = Math.ceil(filteredDepartments.length / usersPerPage);
  const filteredDepartmentsPaginate =
    filteredDepartments.length > 0 ? (
      filteredDepartments.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
        return content;
      })
    ) : (
      <div>No se encontraron datos</div>
    );

  useEffect(() => {
    console.log('usersPerPage: ', usersPerPage);
    console.log('pagesVisited: ', pagesVisited);
    console.log('pageNumber: ', pageNumberDMDepartments);
  }, [usersPerPage, pagesVisited, pageNumberDMDepartments]);
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

  const handleChange = (e) => {
    setInputSearch(e);
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  useEffect(() => {
    let arr = new Array(columnsTableDepartments.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    setCheckedExecutionState(arr);
  }, [setCheckedExecutionState]);

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
            placeholder={`Buscar por ${searchByColumnDepartment.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableDepartments.map((data) => ({
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
              passedFunction={() => openModalState(nameModals.modalCreateDepartmentState)}
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
              passedFunction={() => openModalState(nameModals.modalCreateDepartmentState)}
            />
          )}
        </div>
        {/* <div className={styles.dropdown}>
          <storybook.DropDownV2
            width="auto"
            height="36px"
            srcDown={iconArrow}
            valueSelected={valueSelected}
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
        </div> */}
      </section>
      <section className={styles.table__years}>
        {width >= BREAKPOINT ? (
          <TableDepartments
            list={filteredDepartmentsPaginate}
            pageCount={pageCount}
            colNames={columnsTableDepartments}
          />
        ) : (
          <TableDepartmentsMobile
            list={filteredDepartmentsPaginate}
            pageCount={8}
            colNames={columnsTableDepartments}
          />
        )}
      </section>
    </>
  );
};

export default Departments;
