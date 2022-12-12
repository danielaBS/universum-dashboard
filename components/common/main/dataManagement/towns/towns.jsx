import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './towns.module.scss';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add_blue.svg';
const iconUpload = '/icons/upload.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
// import TableAreasMobile from './tableAreasMobile/tableAreasMobile';
import { BREAKPOINT, nameModals, columnsTableTowns } from '@consts/index';
import useWindowSize from '@hooks/useWindowSize';
import TableTowns from './tableTowns/tableTowns';
import TableTownsMobile from './tableTownsMobile/tableTownsMobile';
import MultipleChecks from '@common/multipleChecks/multipleChecks';
const iconAddDark = '/icons/add_dark.svg';
const iconUploadDark = '/icons/upload_dark.svg';

const Towns = () => {
  const {
    listAllTowns,
    alertEditStatus,
    isCreateDataManagement,
    isBulkLoadInstitutionsManagement,
    openModalState,
    searchByColumnTown,
    pageNumberDMTowns,
    checkedTableExecutionState,
    setCheckedExecutionState,
  } = useStore(
    (state) => ({
      listAllTowns: state.listAllTowns,
      alertEditStatus: state.alertEditStatus,
      isCreateDataManagement: state.isCreateDataManagement,
      isBulkLoadInstitutionsManagement: state.isBulkLoadInstitutionsManagement,
      searchByColumnTown: state.searchByColumnTown,
      openModalState: state.openModalState,
      pageNumberDMTowns: state.pageNumberDMTowns,
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
      ID: column.idTown.toString().toLowerCase(),
      Nombre: column.town_name.toString().toLowerCase(),
      Departamento: column.department_name.toString().toLowerCase(),
      'Fecha de inicio': column.date_creation.toString().toLowerCase(),
      'Fecha de modificación': column.date_modification.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnTown.text]
      ? FILTER_SEARCH[searchByColumnTown.text]
      : column.town_name.toString().toLowerCase();
  };

  const filteredTowns = listAllTowns.filter((data) => {
    if (inputSearch.length >= 1) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllTowns;
    }
  });

  // const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  const usersPerPage = 6;
  const pagesVisited = pageNumberDMTowns * usersPerPage;
  const pageCount = Math.ceil(filteredTowns.length / usersPerPage);
  const filteredListTowns =
    filteredTowns.length > 0 ? (
      filteredTowns.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
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

  const handleUploadButton = () => {
    openModalState(nameModals.modalUploadTownState);
  };

  const handleChange = (e) => {
    setInputSearch(e);
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  useEffect(() => {
    let arr = new Array(columnsTableTowns.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    arr[4] = true;
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
            placeholder={`Buscar por ${searchByColumnTown.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableTowns.map((data) => ({
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
          {width >= BREAKPOINT ? (
            <>
              {isCreateDataManagement && (
                <storybook.ButtonCommon
                  text="CREAR"
                  width="8rem"
                  height="36px"
                  showIcon
                  iconButton={iconAdd}
                  bgColor={'white'}
                  color="#00A4AD"
                  border="1px solid #00A4AD"
                  borderradius="5px"
                  passedFunction={() => openModalState(nameModals.modalCreateTownState)}
                />
              )}
              {isBulkLoadInstitutionsManagement && (
                <div className={styles.upload_button}>
                  <storybook.ButtonCommon
                    text="SUBIR"
                    width="8rem"
                    height="36px"
                    showIcon
                    iconButton={iconUpload}
                    borderradius="5px"
                    passedFunction={() => handleUploadButton()}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className={styles.icon_button}
                onClick={() => openModalState(nameModals.modalCreateTownState)}
              >
                <storybook.Image src={iconAddDark} />
              </div>
              <div className={styles.icon_button} onClick={() => handleUploadButton()}>
                <storybook.Image src={iconUploadDark} />
              </div>
            </>
          )}
        </div>
      </section>
      <section className={styles.table__years}>
        {width >= BREAKPOINT ? (
          <TableTowns list={filteredListTowns} pageCount={pageCount} colNames={columnsTableTowns} />
        ) : (
          <TableTownsMobile list={filteredListTowns} pageCount={8} colNames={columnsTableTowns} />
        )}
      </section>
    </>
  );
};

export default Towns;
