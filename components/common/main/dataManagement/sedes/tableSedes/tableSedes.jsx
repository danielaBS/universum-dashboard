import React, { useEffect, useState } from 'react';
import styles from './tableSedes.module.scss';
import useStore from '@store/index';

const iconOptions = '/icons/optionMenu.svg';
const iconSearch = '/icons/search_input.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals, optionsDatamanagement } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableSedes } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableSedes = ({ list, pageCount, colNames }) => {
  const {
    openModalState,
    setDataSedeToEdit,
    searchByColumnSede,
    setSearchBySede,
    setDataSedeToDelete,
    isEditDataManagement,
    isDeleteDataManagement,
    setPageNumberDMSedes,
    checkedTableExecutionState,
    setDownloadType,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataSedeToEdit: state.setDataSedeToEdit,
      setDataSedeToDelete: state.setDataSedeToDelete,
      searchByColumnSede: state.searchByColumnSede,
      setSearchBySede: state.setSearchBySede,
      isEditDataManagement: state.isEditDataManagement,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setPageNumberDMSedes: state.setPageNumberDMSedes,
      checkedTableExecutionState: state.checkedTableExecutionState,
      setDownloadType: state.setDownloadType,
    }),
    shallow,
  );

  const [listFiltered, setListFiltered] = useState([]);

  const [options, setOptions] = useState(optionsDatamanagement);

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
      setOptions((state) => [...state].filter((data) => data.id !== 2));
    }
  }, [isEditDataManagement]);

  useEffect(() => {
    if (isDeleteDataManagement) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 3));
    }
  }, [isDeleteDataManagement]);

  const handleDeleteButton = (data) => {
    setDataSedeToDelete(data);
    openModalState(nameModals.modalDeleteSedeState);
  };
  const handleEditButton = (data) => {
    setDataSedeToEdit(data);
    openModalState(nameModals.modalEditSedeState);
  };

  const handleDownload = (data, type) => {
    setDownloadType(type);
    setDataSedeToEdit(data);
    openModalState(nameModals.modalDownloadSedeState);
  };

  const handleOption = (info, data) => {
    const options = {
      0: () => handleDownload(data, 0),
      1: () => handleDownload(data, 1),
      2: () => handleEditButton(data),
      3: () => handleDeleteButton(data),
    };
    return options[info.value.id]() || null;
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMSedes(selected);
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
                  onClick={() => setSearchBySede(column)}
                  className={
                    searchByColumnSede.text === column.text
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
                  {checkedTableExecutionState[0] && <td>{data.idSede}</td>}
                  {checkedTableExecutionState[1] && <td>{data.name_sede}</td>}
                  {checkedTableExecutionState[2] && <td>{data.name_institution}</td>}
                  {checkedTableExecutionState[3] && <td>{data.consecutivo}</td>}
                  {checkedTableExecutionState[4] && <td>{data.num_dane}</td>}
                  {checkedTableExecutionState[5] && <td>{data.date_creation}</td>}
                  {checkedTableExecutionState[6] && <td>{data.date_modification}</td>}
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

export default TableSedes;

TableSedes.propTypes = {
  list: PropTypes.array.isRequired,
};

TableSedes.defaultProps = {
  list: [],
};
