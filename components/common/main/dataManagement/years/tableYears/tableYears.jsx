import React, { useEffect, useState } from 'react';
import styles from './tableYears.module.scss';
import useStore from '@store/index';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// import CheckboxList from '@common/checkboxList/checkboxList';
// import { columnsTableYear } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableYears = ({ list, pageCount, colNames }) => {
  const {
    openModalState,
    setDataYearToEdit,
    setDataYearToDelete,
    searchByColumnYear,
    setSearchByYear,
    isEditDataManagement,
    setPageNumberDMYears,
    isDeleteDataManagement,
    checkedTableExecutionState,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataYearToEdit: state.setDataYearToEdit,
      setDataYearToDelete: state.setDataYearToDelete,
      searchByColumnYear: state.searchByColumnYear,
      setSearchByYear: state.setSearchByYear,
      isEditDataManagement: state.isEditDataManagement,
      setPageNumberDMYears: state.setPageNumberDMYears,
      isDeleteDataManagement: state.isDeleteDataManagement,
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

  const handleEditButton = (data) => {
    setDataYearToEdit(data);
    openModalState(nameModals.modalEditYearState);
  };

  const handleDeleteButton = (data) => {
    setDataYearToDelete(data);
    openModalState(nameModals.modalDeleteYearState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMYears(selected);
  };

  return (
    <>
      <div className={styles.table__container}>
        <table className={styles.table__periods} cellSpacing="0">
          <thead>
            <tr>
              {/* <th className={styles.th}>

          </th> */}
              {listFiltered.map((column) => (
                <th
                  key={column.id}
                  onClick={() => setSearchByYear(column)}
                  className={
                    searchByColumnYear.text === column.text
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
                  {/* <td>
              <div className={styles.table__periods_title}>
                <CheckboxList
                  checked={checkedState[index]}
                  setState={setCheckedState}
                  idCheckbox={index}
                  onChange={handleChange}
                />
              </div>
            </td> */}
                  {checkedTableExecutionState[0] && <td>{data.idYear}</td>}
                  {checkedTableExecutionState[1] && <td>{data.title}</td>}
                  {checkedTableExecutionState[2] && <td>{data.ejecuciones}</td>}
                  {checkedTableExecutionState[3] && <td>{data.description}</td>}
                  {checkedTableExecutionState[4] && <td>{data.date_creation}</td>}
                  {checkedTableExecutionState[5] && <td>{data.date_modification}</td>}

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

export default TableYears;

TableYears.propTypes = {
  list: PropTypes.array.isRequired,
};

TableYears.defaultProps = {
  list: [],
};
