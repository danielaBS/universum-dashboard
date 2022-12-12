import React from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableEstamentosMobile.module.scss';
import PropTypes from 'prop-types';
const iconEdit = '/icons/edit.svg';
// const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableEstamentosMobile = ({ list, pageCount }) => {
  const {
    openModalState,
    setDataEstamentoToEdit,
    // searchByColumnEstamento,
    // setSearchByEstamento,
    // setDataExecutionToDelete,
    setPageNumberDMEstamentos,
    // isDeleteDataManagement,
    isEditDataManagement,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataEstamentoToEdit: state.setDataEstamentoToEdit,
      searchByColumnEstamento: state.searchByColumnEstamento,
      setSearchByEstamento: state.setSearchByEstamento,
      setDataExecutionToDelete: state.setDataExecutionToDelete,
      setPageNumberDMEstamentos: state.setPageNumberDMEstamentos,
      // isDeleteDataManagement: state.isDeleteDataManagement,
      isEditDataManagement: state.isEditDataManagement,
    }),
    shallow,
  );

  // const handleDeleteButton = (data) => {
  //   setDataExecutionToDelete(data);
  //   openModalState(nameModals.modalDeleteExecutionState);
  // };
  const handleEditButton = (data) => {
    openModalState(nameModals.modalEditEstamentoState);
    setDataEstamentoToEdit(data);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMEstamentos(selected);
  };

  // const nodeDelete = (data) =>
  //   isDeleteDataManagement && (
  //     <div onClick={() => handleDeleteButton(data)}>
  //       <storybook.Image src={iconDelete} />
  //     </div>
  //   );

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
              name={data.name_state}
              childrenActions={[nodeEdit(data)]}
              options={[
                { title: 'Nombre', value: data.name_state },
                {
                  title: 'Fecha de Creación',
                  value: data.date_creation,
                  // value: new Date(data.date_creation).toISOString().slice(0, 10),
                },
                {
                  title: 'Fecha de Modificación',
                  value: data.date_modification,
                  // value: new Date(data.date_modification).toISOString().slice(0, 10),
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

export default TableEstamentosMobile;

TableEstamentosMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableEstamentosMobile.defaultProps = {
  list: [],
};
