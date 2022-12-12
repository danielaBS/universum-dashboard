import React, { useEffect, useState } from 'react';
import styles from './tableEstamentos.module.scss';
import useStore from '@store/index';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableEstamentos } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableEstamentos = ({ list, pageCount, colNames }) => {
  const {
    openModalState,
    setDataEstamentoToEdit,
    searchByColumnEstamento,
    setSearchByEstamento,
    setDataEstamentoToDelete,
    isDeleteDataManagement,
    isEditDataManagement,
    setPageNumberDMEstamentos,
    checkedTableExecutionState,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataEstamentoToEdit: state.setDataEstamentoToEdit,
      searchByColumnEstamento: state.searchByColumnEstamento,
      setSearchByEstamento: state.setSearchByEstamento,
      setDataEstamentoToDelete: state.setDataEstamentoToDelete,
      isDeleteDataManagement: state.isDeleteDataManagemen,
      isEditDataManagement: state.isEditDataManagement,
      setPageNumberDMEstamentos: state.setPageNumberDMEstamentos,
      checkedTableExecutionState: state.checkedTableExecutionState,
    }),
    shallow,
  );

  const [listFiltered, setListFiltered] = useState([]);

  useEffect(() => {
    const listChecked = checkedTableExecutionState.map((data, index) => {
      if (data) {
        return colNames[index];
      } else {
        return false;
      }
    });
    setListFiltered(listChecked.filter((data) => data !== false));
  }, [checkedTableExecutionState, colNames]);

  const handleDeleteButton = (data) => {
    setDataEstamentoToDelete(data);
    openModalState(nameModals.modalDeleteExecutionState);
  };
  const handleEditButton = (data) => {
    setDataEstamentoToEdit(data);
    openModalState(nameModals.modalEditEstamentoState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMEstamentos(selected);
  };

  return (
    <>
      <div className={styles.table__container}>
        <table className={styles.table__periods} cellSpacing="0">
          <thead>
            <tr>
              {listFiltered.map((column) => (
                <th
                  key={column.id}
                  onClick={() => setSearchByEstamento(column)}
                  className={
                    searchByColumnEstamento.text === column.text
                      ? `${styles.th} ${styles.th_active}`
                      : styles.th
                  }
                >
                  {column.text}
                </th>
              ))}
              {/* <th className={styles.th}></th> */}
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.map((data, index) => (
                <tr key={index}>
                  {checkedTableExecutionState[0] && <td>{data.idState}</td>}
                  {checkedTableExecutionState[1] && <td>{data.name_state}</td>}
                  {checkedTableExecutionState[2] && <td>{data.date_creation}</td>}
                  {checkedTableExecutionState[3] && <td>{data.date_modification}</td>}

                  {isEditDataManagement && (
                    <td>
                      <div
                        className={styles.table__periods_icon}
                        onClick={() => handleEditButton(data)}
                      >
                        <storybook.Image src={iconEdit} />
                      </div>
                    </td>
                  )}
                  {isDeleteDataManagement && (
                    <td>
                      <div
                        className={styles.table__periods_icon}
                        onClick={() => handleDeleteButton(data)}
                      >
                        <storybook.Image src={iconDelete} />
                      </div>
                    </td>
                  )}
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
        pageRangeDisplayed={5}
        pageCount={pageCount}
        containerClassName={styles.buttons}
        activeClassName={styles.activePage}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={'disabled'}
      />
    </>
  );
};

export default TableEstamentos;

TableEstamentos.propTypes = {
  list: PropTypes.array.isRequired,
};

TableEstamentos.defaultProps = {
  list: [],
};
