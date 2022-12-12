import React from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableYearsMobile.module.scss';
import PropTypes from 'prop-types';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals } from '@consts/index';
// import CheckboxList from '@common/checkboxList/checkboxList';
// import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableYearsMobile = ({ list, pageCount }) => {
  const {
    openModalState,
    setDataYearToEdit,
    setDataYearToDelete,
    isDeleteDataManagement,
    setPageNumberDMYears,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataYearToEdit: state.setDataYearToEdit,
      setDataYearToDelete: state.setDataYearToDelete,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setPageNumberDMYears: state.setPageNumberDMYears,
    }),
    shallow,
  );

  const handleEditButton = (data) => {
    setDataYearToEdit(data);
    openModalState(nameModals.modalEditYearState);
  };

  const nodeEdit = (data) => (
    <div onClick={() => handleEditButton(data)}>
      <storybook.Image src={iconEdit} />
    </div>
  );

  const handleDeleteButton = (data) => {
    setDataYearToDelete(data);
    openModalState(nameModals.modalDeleteYearState);
  };

  const nodeDelete = (data) =>
    isDeleteDataManagement && (
      <div onClick={() => handleDeleteButton(data)}>
        <storybook.Image src={iconDelete} />
      </div>
    );

  const handlePageClick = ({ selected }) => {
    setPageNumberDMYears(selected);
  };

  return (
    <>
      <div className={styles.tableMobile}>
        {list.length > 0 &&
          list.map((data, index) => (
            <div className={styles.tableMobile_row} key={index}>
              <div className={styles.table__periods_dropdown}>
                <DropdownTable
                  name={data.title.toString()}
                  childrenActions={[nodeEdit(data), nodeDelete(data)]}
                  options={[
                    { title: 'Ejecuciones', value: data.ejecuciones },
                    { title: 'Descripción	', value: data.description },
                    {
                      title: 'Fecha de creación',
                      value: data.date_creation,
                    },
                    {
                      title: 'Fecha de modificación',
                      value: data.date_modification,
                    },
                  ]}
                />
              </div>
            </div>
          ))}
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

export default TableYearsMobile;

TableYearsMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableYearsMobile.defaultProps = {
  list: [],
};
