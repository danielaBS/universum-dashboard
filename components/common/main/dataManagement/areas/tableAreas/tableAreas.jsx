import React, { useEffect, useState } from 'react';
import styles from './tableAreas.module.scss';
import useStore from '@store/index';
const iconEdit = '/icons/edit.svg';
// const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableAreas } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableAreas = ({ list, pageCount, colNames }) => {
  const {
    openModalState,
    setDataAreaToEdit,
    searchByColumnArea,
    setSearchByArea,
    // setDataAreaToDelete,
    isEditDataManagement,
    // isDeleteDataManagement,
    setPageNumberDMAreas,
    checkedTableExecutionState,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataAreaToEdit: state.setDataAreaToEdit,
      searchByColumnArea: state.searchByColumnArea,
      setSearchByArea: state.setSearchByArea,
      setDataAreaToDelete: state.setDataAreaToDelete,
      isEditDataManagement: state.isEditDataManagement,
      // isDeleteDataManagement: state.isDeleteDataManagement,
      setPageNumberDMAreas: state.setPageNumberDMAreas,
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

  // const handleDeleteButton = (data) => {
  //   setDataAreaToDelete(data);
  //   openModalState(nameModals.modalDeleteExecutionState);
  // };
  const handleEditButton = (data) => {
    setDataAreaToEdit(data);
    openModalState(nameModals.modalEditAreaState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMAreas(selected);
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
                  onClick={() => setSearchByArea(column)}
                  className={
                    searchByColumnArea.text === column.text
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
                  {checkedTableExecutionState[0] && <td>{data.idArea}</td>}
                  {checkedTableExecutionState[1] && <td>{data.name_area}</td>}
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
                  {/* {isDeleteDataManagement && (
              <td>
                <div
                  className={styles.table__periods_icon}
                  onClick={() => handleDeleteButton(data)}
                >
                  <storybook.Image src={iconDelete} />
                </div>
              </td>
            )} */}
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

export default TableAreas;

TableAreas.propTypes = {
  list: PropTypes.array.isRequired,
};

TableAreas.defaultProps = {
  list: [],
};
