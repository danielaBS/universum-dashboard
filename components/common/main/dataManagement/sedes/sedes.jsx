import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './sedes.module.scss';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add_blue.svg';
const iconUpload = '/icons/upload.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
// import TableAreasMobile from './tableAreasMobile/tableAreasMobile';
import { BREAKPOINT, nameModals, columnsTableSedes } from '@consts/index';
import useWindowSize from '@hooks/useWindowSize';
import TableSedes from './tableSedes/tableSedes';
import TableSedesMobile from './tableSedesMobile/tableSedesMobile';
import MultipleChecks from '@common/multipleChecks/multipleChecks';
const iconAddDark = '/icons/add_dark.svg';
const iconUploadDark = '/icons/upload_dark.svg';

const Sedes = () => {
  const {
    listAllSedes,
    alertEditStatus,
    isCreateDataManagement,
    openModalState,
    searchByColumnSede,
    isBulkLoadInstitutionsManagement,
    pageNumberDMSedes,
    checkedTableExecutionState,
    setCheckedExecutionState,
  } = useStore(
    (state) => ({
      listAllSedes: state.listAllSedes,
      alertEditStatus: state.alertEditStatus,
      isCreateDataManagement: state.isCreateDataManagement,
      searchByColumnSede: state.searchByColumnSede,
      openModalState: state.openModalState,
      isBulkLoadInstitutionsManagement: state.isBulkLoadInstitutionsManagement,
      pageNumberDMSedes: state.pageNumberDMSedes,
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
      ID: column.idSede.toString().toLowerCase(),
      Nombre: column.name_sede.toString().toLowerCase(),
      Institución: column.name_institution.toString().toLowerCase(),
      Consecutivo: column.consecutivo.toString().toLowerCase(),
      Dane: column.num_dane.toString().toLowerCase(),
      'Fecha de creación': column.date_creation.toString().toLowerCase(),
      'Fecha de modificación': column.date_modification.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnSede.text]
      ? FILTER_SEARCH[searchByColumnSede.text]
      : column.name_sede.toString().toLowerCase();
  };

  const filteredSedes = listAllSedes.filter((data) => {
    if (inputSearch.length >= 1) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllSedes;
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

  const handleCreateButton = () => {
    openModalState(nameModals.modalCreateSedeState);
  };

  const handleUploadButton = () => {
    openModalState(nameModals.modalUploadSedeState);
  };
  // const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/

  const usersPerPage = 6;
  const pagesVisited = pageNumberDMSedes * usersPerPage;
  const pageCount = Math.ceil(filteredSedes.length / usersPerPage);
  const filteredListSedes =
    filteredSedes.length > 0 ? (
      filteredSedes.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
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

  useEffect(() => {
    let arr = new Array(columnsTableSedes.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    arr[4] = true;
    arr[5] = true;
    arr[6] = true;
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
            placeholder={`Buscar por ${searchByColumnSede.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableSedes.map((data) => ({
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
          {/* <div className={styles.icon_delete}>
            <storybook.Image src={iconDelete} />
          </div> */}
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
                  passedFunction={() => handleCreateButton()}
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
              <div className={styles.icon_button} onClick={() => handleCreateButton()}>
                <storybook.Image src={iconAddDark} />
              </div>
              <div className={styles.icon_button}>
                <storybook.Image src={iconUploadDark} />
              </div>
            </>
          )}
        </div>
      </section>
      <section className={styles.table__years}>
        {width >= BREAKPOINT ? (
          <TableSedes list={filteredListSedes} pageCount={pageCount} colNames={columnsTableSedes} />
        ) : (
          <TableSedesMobile list={filteredListSedes} pageCount={8} colNames={columnsTableSedes} />
        )}
      </section>
    </>
  );
};

export default Sedes;
