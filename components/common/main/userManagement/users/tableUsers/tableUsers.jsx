import React, { useEffect, useState } from 'react';
import styles from './tableUsers.module.scss';
import useStore from '@store/index';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableUsers } from '@consts/index';
import ReactPaginate from 'react-paginate';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/breakpoint';

const TableUsers = ({ list, colNames, pageCount, setPageNumber, reset, setReset }) => {
  const {
    openModalState,
    setSearchByUser,
    searchByColumnUsers,
    checkedTableUserstate,
    // setPageNumber,
    setViewUser,
    setDataUserToEdit,
    pageNumberUsers,
    setDataUserToDelete,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setSearchByUser: state.setSearchByUser,
      searchByColumnUsers: state.searchByColumnUsers,
      checkedTableUserstate: state.checkedTableUserstate,
      // setPageNumber: state.setPageNumber,
      setViewUser: state.setViewUser,
      setDataUserToEdit: state.setDataUserToEdit,
      pageNumberUsers: state.pageNumberUsers,
      setDataUserToDelete: state.setDataUserToDelete,
    }),
    shallow,
  );

  const [listFiltered, setListFiltered] = useState([]);

  const { width } = useWindowSize();

  const handleEditButton = (data) => {
    setViewUser(2);
    setDataUserToEdit(data.id);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDeleteButton = (data) => {
    setDataUserToDelete(data);
    openModalState(nameModals.modalDeleteUsersState);
  };

  useEffect(() => {
    const listChecked = checkedTableUserstate.map((data, index) => {
      if (data) {
        return colNames[index];
      } else {
        return false;
      }
    });
    setListFiltered(listChecked.filter((data) => data !== false));
  }, [checkedTableUserstate, colNames]);

  useEffect(() => {
    setPageNumber(0);
  }, [setPageNumber]);

  useEffect(() => {
    if (reset) {
      setPageNumber(0);
      setReset(false);
    }
  }, [reset, setReset, setPageNumber]);

  return (
    <div className={styles.paginate_container}>
      <div className={styles.paginate_container__data_container}>
        <table className={styles.table__periods} cellSpacing="0">
          <thead>
            <tr>
              {listFiltered.map((column) => (
                <th
                  key={column.id}
                  onClick={() => setSearchByUser(column)}
                  className={
                    searchByColumnUsers.text === column.text
                      ? `${styles.th} ${styles.th_active}`
                      : styles.th
                  }
                >
                  {column.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.map((data, index) => (
                <tr key={index}>
                  {checkedTableUserstate[0] && <td>{data.id}</td>}
                  {checkedTableUserstate[1] && <td>{data.username}</td>}
                  {checkedTableUserstate[2] && <td>{data.first_name}</td>}
                  {checkedTableUserstate[3] && <td>{data.last_name}</td>}
                  {checkedTableUserstate[4] && <td>{data.email}</td>}
                  {checkedTableUserstate[5] && <td>{data.roles}</td>}
                  {checkedTableUserstate[6] && <td>{data.name_institution}</td>}
                  <td>
                    <div
                      className={styles.table__periods_icon}
                      onClick={() => handleEditButton(data)}
                    >
                      <storybook.Image src={iconEdit} />
                    </div>
                  </td>
                  <td>
                    <div
                      className={styles.table__periods_icon}
                      onClick={() => handleDeleteButton(data)}
                    >
                      <storybook.Image src={iconDelete} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        breakLabel={<span className="gap">...</span>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={width <= BREAKPOINT ? 0 : 3}
        marginPagesDisplayed={width <= BREAKPOINT ? 0 : 2}
        pageCount={pageCount}
        containerClassName={styles.buttons}
        activeClassName={styles.activePage}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={styles.disabled}
        forcePage={pageNumberUsers}
      />
    </div>
  );
};

export default TableUsers;

TableUsers.propTypes = {
  list: PropTypes.array.isRequired,
  colNames: PropTypes.array.isRequired,
};

TableUsers.defaultProps = {
  list: [],
  colNames: [],
};
