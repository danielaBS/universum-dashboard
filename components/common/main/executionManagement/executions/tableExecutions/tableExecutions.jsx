import React, { useEffect, useState } from 'react';
import styles from './tableExecutions.module.scss';
import useStore from '@store/index';
// const iconEdit = '/icons/edit.svg';
// const iconDelete = '/icons/delete.svg';
const iconOptions = '/icons/optionMenu.svg';
const iconSearch = '/icons/search_input.svg';
import storybook from '@talentumlab/storybook-design-system';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableExecutions } from '@consts/index';
import { capitalizeStr } from '@hooks/capitalizeString';
import ReactPaginate from 'react-paginate';
import useWindowSize from '@hooks/useWindowSize';
const iconArrow = '/icons/arrow_dropdown.svg';
import { BREAKPOINT } from '@consts/breakpoint';
import { optionsReportsExecution } from '@consts/optionsReports';

const TableExecutions = ({ list, colNames, pageCount, setPageNumber, reset, setReset }) => {
  const {
    openModalState,
    setDataExecutionToEdit,
    setDataExecutionToDelete,
    setViewExecution,
    setSearchByExecution,
    searchByColumnExecution,
    fetchEditExecutionState,
    isDeleteExecution,
    isEditExecution,
    isStateUpdatedExecution,
    checkedTableExecutionState,
    // setPageNumber,
    cleanFiltersExecution,
    pageNumberExecutions,
    fetchDownloadExecutionCuestionarios,
    fetchDownloadExecutionReport,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataExecutionToEdit: state.setDataExecutionToEdit,
      setDataExecutionToDelete: state.setDataExecutionToDelete,
      setViewExecution: state.setViewExecution,
      setSearchByExecution: state.setSearchByExecution,
      searchByColumnExecution: state.searchByColumnExecution,
      fetchEditExecutionState: state.fetchEditExecutionState,
      isDeleteExecution: state.isDeleteExecution,
      isEditExecution: state.isEditExecution,
      isStateUpdatedExecution: state.isStateUpdatedExecution,
      checkedTableExecutionState: state.checkedTableExecutionState,
      // setPageNumber: state.setPageNumber,
      cleanFiltersExecution: state.cleanFiltersExecution,
      pageNumberExecutions: state.pageNumberExecutions,
      fetchDownloadExecutionCuestionarios: state.fetchDownloadExecutionCuestionarios,
      fetchDownloadExecutionReport: state.fetchDownloadExecutionReport,
    }),
    shallow,
  );

  const [listFiltered, setListFiltered] = useState([]);

  const { width } = useWindowSize();

  const [options, setOptions] = useState(optionsReportsExecution);

  useEffect(() => {
    if (isEditExecution) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 2));
    }
  }, [isEditExecution]);

  useEffect(() => {
    if (isDeleteExecution) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 3));
    }
  }, [isDeleteExecution]);

  const handleEditButton = (data) => {
    setViewExecution(2);
    setDataExecutionToEdit(data);
    cleanFiltersExecution();
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDeleteButton = (data) => {
    setDataExecutionToDelete(data);
    openModalState(nameModals.modalDeleteExecutionState);
  };

  const handleEdit = (info, listData) => {
    // openModalState(nameModals.modalEditExecutionState);
    fetchEditExecutionState({
      state: info.value.name,
      idEjecution: listData.idEjecution,
    });
  };

  const handleOption = (info, data) => {
    const options = {
      0: () => fetchDownloadExecutionCuestionarios(data.idEjecution),
      1: () => fetchDownloadExecutionReport(data.idEjecution),
      2: () => handleEditButton(data),
      3: () => handleDeleteButton(data),
    };
    return options[info.value.id]() || null;
  };

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
                  onClick={() => setSearchByExecution(column)}
                  className={
                    searchByColumnExecution.text === column.text
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
                  {checkedTableExecutionState[0] && <td>{data.idEjecution || '-'}</td>}
                  {checkedTableExecutionState[1] && <td>{data.name_aplication || '-'}</td>}
                  {checkedTableExecutionState[2] && <td>{data.title || '-'}</td>}
                  {checkedTableExecutionState[3] && <td>{data.description || '-'}</td>}
                  {checkedTableExecutionState[4] && <td>{data.date_start || '-'}</td>}
                  {checkedTableExecutionState[5] && <td>{data.date_end || '-'}</td>}
                  {checkedTableExecutionState[6] && (
                    <td>
                      {isStateUpdatedExecution ? (
                        <div className={styles.state}>
                          <storybook.DropDownV2
                            minWidth="1rem"
                            srcDown={iconArrow}
                            width="5.4rem"
                            height="28px"
                            // backgroundColor
                            initialValue={{
                              value: { id: 0, name: capitalizeStr(data.state) },
                              id: '',
                            }}
                            className={
                              data.state.toLowerCase() === 'cerrado' ? styles.closed : styles.open
                            }
                            valueSelected={(info) => handleEdit(info, data)}
                            dropdownGap={0}
                            options={[
                              {
                                id: 0,
                                name: 'Abierto',
                              },
                              {
                                id: 1,
                                name: 'Cerrado',
                              },
                            ]}
                          />
                        </div>
                      ) : (
                        <div className={styles.state}>
                          <div
                            className={
                              data.state.toLowerCase() === 'cerrado'
                                ? styles.closed_common
                                : styles.open_common
                            }
                          >
                            {capitalizeStr(data.state)}
                          </div>
                        </div>
                      )}
                    </td>
                  )}
                  {checkedTableExecutionState[7] && <td>{data.username}</td>}
                  {checkedTableExecutionState[8] && <td>{data.date_creation}</td>}
                  {checkedTableExecutionState[9] && <td>{data.date_modification}</td>}
                  {/* <td>
                    <div
                      className={styles.table__periods_icon}
                      onClick={() => handleEditButton(data)}
                    >
                      <storybook.Image src={iconEdit} />
                    </div>
                  </td>
                  {isDeleteExecution && (
                    <td>
                      <div
                        className={styles.table__periods_icon}
                        onClick={() => handleDeleteButton(data)}
                      >
                        <storybook.Image src={iconDelete} />
                      </div>
                    </td>
                  )} */}
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
                        dropdownGap={0}
                        // keepOpen={true}
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
        pageRangeDisplayed={width <= BREAKPOINT ? 0 : 3}
        marginPagesDisplayed={width <= BREAKPOINT ? 0 : 2}
        pageCount={pageCount}
        containerClassName={styles.buttons}
        activeClassName={styles.activePage}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={styles.disabled}
        forcePage={pageNumberExecutions}
      />
    </div>
  );
};

export default TableExecutions;

TableExecutions.propTypes = {
  list: PropTypes.array.isRequired,
  colNames: PropTypes.array.isRequired,
};

TableExecutions.defaultProps = {
  list: [],
  colNames: [],
};
