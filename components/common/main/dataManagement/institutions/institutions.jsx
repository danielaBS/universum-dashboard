import React from 'react';
import styles from './institutions.module.scss';
import storybook from '@talentumlab/storybook-design-system';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add_blue.svg';
const iconUpload = '/icons/upload.svg';
// import iconDelete from '/icons/delete.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import { BREAKPOINT, nameModals, columnsTableInstitutions } from '@consts/index';
import TableInstitutions from './tableInstitutions/tableInstitutions';
import useWindowSize from '@hooks/useWindowSize';
import TableInstitutionsMobile from './tableInstitutionsMobile/tableInstitutionsMobile';
import MultipleChecks from '@common/multipleChecks/multipleChecks';
const iconAddDark = '/icons/add_dark.svg';
const iconUploadDark = '/icons/upload_dark.svg';

const Institutions = () => {
  const {
    listAllInstitutions,
    alertEditStatus,
    openModalState,
    searchByColumnInstitution,
    isCreateDataManagement,
    isBulkLoadInstitutionsManagement,
    pageNumberDMInstitutions,
    checkedTableExecutionState,
    setCheckedExecutionState,
  } = useStore(
    (state) => ({
      listAllInstitutions: state.listAllInstitutions,
      alertEditStatus: state.alertEditStatus,
      openModalState: state.openModalState,
      searchByColumnInstitution: state.searchByColumnInstitution,
      isCreateDataManagement: state.isCreateDataManagement,
      isBulkLoadInstitutionsManagement: state.isBulkLoadInstitutionsManagement,
      pageNumberDMInstitutions: state.pageNumberDMInstitutions,
      checkedTableExecutionState: state.checkedTableExecutionState,
      setCheckedExecutionState: state.setCheckedExecutionState,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  const handleCreateButton = () => {
    openModalState(nameModals.modalCreateInstitutionState);
  };

  const handleUploadButton = () => {
    openModalState(nameModals.modalUploadInstitutionState);
  };

  const [inputSearch, setInputSearch] = useState('');

  // const [rowNumber, setRowNumber] = useState(4);

  const searchByColumn = (column) => {
    const FILTER_SEARCH = {
      Nombre: column.name_institution.toString().toLowerCase(),
      Institución: column.town_name.toString().toLowerCase(),
      Sede: column.name_headquarter.toString().toLowerCase(),
      Dane: column.num_dane.toString().toLowerCase(),
      'Fecha de creación': column.date_creation.toString().toLowerCase(),
      'Fecha de modificación': column.date_modification.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnInstitution.id]
      ? FILTER_SEARCH[searchByColumnInstitution.id]
      : column.name_institution.toString().toLowerCase();
  };

  const filteredInstitutions = listAllInstitutions.filter((data) => {
    if (inputSearch.length >= 3) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllInstitutions;
    }
  });

  // const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/

  const usersPerPage = 6;
  const pagesVisited = pageNumberDMInstitutions * usersPerPage;
  const pageCount = Math.ceil(filteredInstitutions.length / usersPerPage);
  const filteresListInstitutions =
    filteredInstitutions.length > 0 ? (
      filteredInstitutions.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
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

  const handleChange = (e) => {
    setInputSearch(e);
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  useEffect(() => {
    let arr = new Array(columnsTableInstitutions.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    arr[4] = true;
    arr[5] = true;
    setCheckedExecutionState(arr);
  }, [setCheckedExecutionState]);

  return (
    <>
      <section className={styles.actions__institution}>
        <div>
          <storybook.Search
            leftIcon
            srcIcon={iconSearch}
            inputWidth={width >= BREAKPOINT ? '20rem' : '100%'}
            inputHeight={'36px'}
            onChange={handleChange}
            placeholder={`Buscar por ${searchByColumnInstitution.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableInstitutions.map((data) => ({
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
              <div className={styles.icon_button} onClick={() => handleUploadButton()}>
                <storybook.Image src={iconUploadDark} />
              </div>
            </>
          )}
        </div>
      </section>
      <section className={styles.table__institutions}>
        {width >= BREAKPOINT ? (
          <TableInstitutions
            list={filteresListInstitutions}
            pageCount={pageCount}
            colNames={columnsTableInstitutions}
          />
        ) : (
          <TableInstitutionsMobile
            list={filteresListInstitutions}
            pageCount={8}
            colNames={columnsTableInstitutions}
          />
        )}
      </section>
    </>
  );
};

export default Institutions;
