import React, { useEffect, useState } from 'react';
import styles from './tableTowns.module.scss';
import useStore from '@store/index';
const iconOptions = '/icons/optionMenu.svg';
const iconSearch = '/icons/search_input.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals, optionsTownDatamanagement } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableTowns } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableTowns = ({ list, pageCount, colNames }) => {
  const {
    openModalState,
    setDataTownToEdit,
    searchByColumnTown,
    setSearchByTown,
    setDataTownToDelete,
    isEditDataManagement,
    isDeleteDataManagement,
    setPageNumberDMTowns,
    checkedTableExecutionState,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataTownToEdit: state.setDataTownToEdit,
      searchByColumnTown: state.searchByColumnTown,
      setSearchByTown: state.setSearchByTown,
      setDataTownToDelete: state.setDataTownToDelete,
      isEditDataManagement: state.isEditDataManagement,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setPageNumberDMTowns: state.setPageNumberDMTowns,
      checkedTableExecutionState: state.checkedTableExecutionState,
    }),
    shallow,
  );

  const [listFiltered, setListFiltered] = useState([]);
  const [options, setOptions] = useState(optionsTownDatamanagement);

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

  useEffect(() => {
    if (isEditDataManagement) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 1));
    }
  }, [isEditDataManagement]);

  useEffect(() => {
    if (isDeleteDataManagement) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 2));
    }
  }, [isDeleteDataManagement]);

  const handleDeleteButton = (data) => {
    setDataTownToDelete(data);
    openModalState(nameModals.modalDeleteTownState);
  };
  const handleEditButton = (data) => {
    setDataTownToEdit(data);
    openModalState(nameModals.modalEditTownState);
  };

  const handleDownload = (data) => {
    setDataTownToEdit(data);
    openModalState(nameModals.modalDownloadTownState);
  };
  const handleOption = (info, data) => {
    const options = {
      0: () => handleDownload(data),
      1: () => handleEditButton(data),
      2: () => handleDeleteButton(data),
    };
    return options[info.value.id]() || null;
  };
  const handlePageClick = ({ selected }) => {
    setPageNumberDMTowns(selected);
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
                  onClick={() => setSearchByTown(column)}
                  className={
                    searchByColumnTown.text === column.text
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
                  {checkedTableExecutionState[0] && <td>{data.idTown}</td>}
                  {checkedTableExecutionState[1] && <td>{data.town_name}</td>}
                  {checkedTableExecutionState[2] && <td>{data.department_name}</td>}
                  {checkedTableExecutionState[3] && <td>{data.date_creation}</td>}
                  {checkedTableExecutionState[4] && <td>{data.date_modification}</td>}
                  <td>
                    <div className={styles.options__chart}>
                      <storybook.DropdownSearch
                        width="auto"
                        height="36px"
                        srcDown={iconOptions}
                        valueSelected={(info) => handleOption(info, data)}
                        options={options}
                        disabled={options.length === 0 ? true : false}
                        backgroundColor={options.length === 0 ? '#c8c8c8' : '#FFFFFF'}
                        className={styles.chartjs_options}
                        iconSearch={iconSearch}
                      />
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

export default TableTowns;

TableTowns.propTypes = {
  list: PropTypes.array.isRequired,
};

TableTowns.defaultProps = {
  list: [],
};
