import React from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableDepartmentsMobile.module.scss';
import PropTypes from 'prop-types';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableDepartmentsMobile = ({ list, pageCount }) => {
  const {
    openModalState,
    setDataDepartmentToEdit,
    //  searchByColumnArea,
    //  setSearchByArea,
    setDataDepartmentToDelete,
    isEditDataManagement,
    isDeleteDataManagement,
    setPageNumberDMDepartments,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataDepartmentToEdit: state.setDataDepartmentToEdit,
      // searchByColumnArea: state.searchByColumnArea,
      // setSearchByArea: state.setSearchByArea,
      setDataDepartmentToDelete: state.setDataDepartmentToDelete,
      isEditDataManagement: state.isEditDataManagement,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setPageNumberDMDepartments: state.setPageNumberDMDepartments,
    }),
    shallow,
  );
  const handleDeleteButton = (data) => {
    setDataDepartmentToDelete(data);
    openModalState(nameModals.modalDeleteDepartmentState);
  };
  const handleEditButton = (data) => {
    openModalState(nameModals.modalEditDepartmentState);
    setDataDepartmentToEdit(data);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMDepartments(selected);
  };

  const nodeDelete = (data) =>
    isDeleteDataManagement && (
      <div onClick={() => handleDeleteButton(data)}>
        <storybook.Image src={iconDelete} />
      </div>
    );

  const nodeEdit = (data) =>
    isEditDataManagement && (
      <div onClick={() => handleEditButton(data)}>
        <storybook.Image src={iconEdit} />
      </div>
    );

  return (
    <>
      <div className={styles.tableMobile}>
        {list.length > 0 &&
          list.map((data, index) => (
            <DropdownTable
              key={index}
              name={data.department_name}
              childrenActions={[nodeEdit(data), nodeDelete(data)]}
              options={[
                { title: 'ID', value: data.idDepartment },
                { title: 'Nombre', value: data.department_name },
                {
                  title: 'Fecha de Creación',
                  value: data.date_creation,
                },
                {
                  title: 'Fecha de Modificación',
                  value: data.date_modification,
                },
              ]}
            />
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

export default TableDepartmentsMobile;

TableDepartmentsMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableDepartmentsMobile.defaultProps = {
  list: [],
};
