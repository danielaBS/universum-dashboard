import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './users.module.scss';
const iconSearch = '/icons/search.svg';
const iconAdd = '/icons/add_blue.svg';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconUpload = '/icons/upload_dark.svg';
import { nameModals } from '@consts/index';
import { useState, useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT, columnsTableUsers } from '@consts/index';
import { scrollToTop } from '@hooks/scrollToTop';
import MultipleChecks from '@common/multipleChecks/multipleChecks';
import TableUsers from './tableUsers/tableUsers';
import TableUsersMobile from './tableUsersMobile/tableUsersMobile';

const Users = () => {
  const {
    alertEditStatus,
    setViewUser,
    searchByColumnUsers,
    checkedTableUserstate,
    setCheckedUserstate,
    pageNumberUsers,
    setPageNumberUsers,
    listAllUsers,
    openModalState,
  } = useStore(
    (state) => ({
      alertEditStatus: state.alertEditStatus,
      setViewUser: state.setViewUser,
      searchByColumnUsers: state.searchByColumnUsers,
      isCreateExecution: state.isCreateExecution,
      checkedTableUserstate: state.checkedTableUserstate,
      setCheckedUserstate: state.setCheckedUserstate,
      pageNumberUsers: state.pageNumberUsers,
      setPageNumberUsers: state.setPageNumberUsers,
      listAllUsers: state.listAllUsers,
      openModalState: state.openModalState,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    console.log(listAllUsers);
  }, [listAllUsers]);

  const [inputSearch, setInputSearch] = useState('');
  const [rowNumber, setRowNumber] = useState(4);

  const searchByColumn = (column) => {
    const FILTER_SEARCH = {
      Id: column.id.toString().toLowerCase(),
      Usuario: column.username && column.username.toString().toLowerCase(),
      'Nombre (s)': column.first_name.toString().toLowerCase(),
      'Apellido (s)': column.last_name.toString().toLowerCase(),
      'Correo electrónico': column.email.toString().toLowerCase(),
      Rol: column.roles.toString().toLowerCase(),
      'Est. Institución': column.name_institution.toString().toLowerCase(),
    };
    return FILTER_SEARCH[searchByColumnUsers.text]
      ? FILTER_SEARCH[searchByColumnUsers.text]
      : column.username.toString().toLowerCase();
  };

  const filteredUsers = listAllUsers.filter((data) => {
    if (inputSearch.length >= 2) {
      return searchByColumn(data).includes(inputSearch.toLowerCase());
    } else {
      return listAllUsers;
    }
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  const handleUploadButton = () => {
    openModalState(nameModals.modalUploadUserFile);
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  useEffect(() => {
    let arr = new Array(columnsTableUsers.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    setCheckedUserstate(arr);
  }, [setCheckedUserstate]);

  const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  // const usersPerPage = 6;
  const pagesVisited = pageNumberUsers * usersPerPage;
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const filteredListUsersPaginate =
    filteredUsers.length > 0 ? (
      filteredUsers.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
        return content;
      })
    ) : (
      <div>No se encontraron datos</div>
    );

  const [reset, setReset] = useState(false);

  const valueSelected = (data) => {
    setReset(true);
    const rows = {
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
            placeholder={`Buscar por ${searchByColumnUsers.text.toLowerCase()}`}
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableUserstate.filter((data) => data === true)}
              options={columnsTableUsers.map((data) => ({
                id: data.id,
                name: data.text,
              }))}
              checkedState={checkedTableUserstate}
              setCheckedState={setCheckedUserstate}
              iconSearch={iconSearch}
            />
          )}
        </div>
        <div>
          <>
            <storybook.ButtonCommon
              text="Crear"
              width="7rem"
              height={'36px'}
              showIcon
              iconButton={iconAdd}
              bgColor={'white'}
              color="#00A4AD"
              border="1px solid #00A4AD"
              borderradius="5px"
              passedFunction={() => setViewUser(1)}
            />
            <div className={styles.upload_button}>
              <storybook.ButtonCommon
                text="SUBIR"
                width="8rem"
                height={'36px'}
                showIcon
                iconButton={iconUpload}
                borderradius="5px"
                passedFunction={() => handleUploadButton()}
              />
            </div>
          </>

          <div>
            <storybook.DropDownV2
              width="auto"
              srcDown={iconArrow}
              valueSelected={valueSelected}
              height={'36px'}
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
          <TableUsers
            list={filteredListUsersPaginate}
            colNames={columnsTableUsers}
            pageCount={pageCount}
            setPageNumber={setPageNumberUsers}
            reset={reset}
            setReset={setReset}
          />
        ) : (
          <TableUsersMobile
            list={filteredListUsersPaginate}
            pageCount={pageCount}
            setPageNumber={setPageNumberUsers}
            reset={reset}
            setReset={setReset}
          />
        )}
      </section>
    </>
  );
};

export default Users;
