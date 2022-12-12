import React, { useEffect, useState } from 'react';
import styles from './tableInstitutions.module.scss';
import useStore from '@store/index';
const iconOptions = '/icons/optionMenu.svg';
const iconSearch = '/icons/search_input.svg';

import storybook from '@talentumlab/storybook-design-system';
import { nameModals, optionsDatamanagement } from '@consts/index';
import shallow from 'zustand/shallow';
import PropTypes from 'prop-types';
// import { columnsTableInstitutions } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableInstitutions = ({ list, pageCount, colNames }) => {
  const {
    openModalState,
    setDataInstitutionToEdit,
    searchByColumnInstitution,
    setSearchByInstitution,
    isEditDataManagement,
    isDeleteDataManagement,
    setDataInstitutionToDelete,
    setPageNumberDMInstitutions,
    checkedTableExecutionState,
    setDownloadType,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataInstitutionToEdit: state.setDataInstitutionToEdit,
      searchByColumnInstitution: state.searchByColumnInstitution,
      setSearchByInstitution: state.setSearchByInstitution,
      isEditDataManagement: state.isEditDataManagement,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setDataInstitutionToDelete: state.setDataInstitutionToDelete,
      setPageNumberDMInstitutions: state.setPageNumberDMInstitutions,
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
    setDataInstitutionToDelete(data);
    openModalState(nameModals.modalDeleteInstitutionState);
  };

  const handleEditButton = (data) => {
    setDataInstitutionToEdit(data);
    openModalState(nameModals.modalEditInstitutionState);
  };

  const handleDownload = (data, type) => {
    setDownloadType(type);
    setDataInstitutionToEdit(data);
    openModalState(nameModals.modalDownloadInstitutionState);
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
    setPageNumberDMInstitutions(selected);
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
                  onClick={() => setSearchByInstitution(column)}
                  className={
                    searchByColumnInstitution.text === column.text
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
                  {checkedTableExecutionState[0] && <td>{data.idInstitution}</td>}
                  {checkedTableExecutionState[1] && <td>{data.name_institution}</td>}
                  {checkedTableExecutionState[2] && <td>{data.num_dane}</td>}
                  {checkedTableExecutionState[3] && <td>{data.town_name}</td>}
                  {checkedTableExecutionState[4] && <td>{data.date_creation}</td>}
                  {checkedTableExecutionState[5] && <td>{data.date_modification}</td>}

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

export default TableInstitutions;

TableInstitutions.propTypes = {
  list: PropTypes.array.isRequired,
};

TableInstitutions.defaultProps = {
  list: [],
};
