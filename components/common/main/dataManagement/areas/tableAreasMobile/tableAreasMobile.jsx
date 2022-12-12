import React from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableAreasMobile.module.scss';
import PropTypes from 'prop-types';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableAreasMobile = ({ list, pageCount }) => {
  const {
    openModalState,
    setDataAreaToEdit,
    //  searchByColumnArea,
    //  setSearchByArea,
    setDataAreaToDelete,
    setPageNumberDMAreas,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataAreaToEdit: state.setDataAreaToEdit,
      searchByColumnArea: state.searchByColumnArea,
      setSearchByArea: state.setSearchByArea,
      setDataAreaToDelete: state.setDataAreaToDelete,
      setPageNumberDMAreas: state.setPageNumberDMAreas,
    }),
    shallow,
  );
  const handleDeleteButton = (data) => {
    setDataAreaToDelete(data);
    openModalState(nameModals.modalDeleteExecutionState);
  };
  const handleEditButton = (data) => {
    setDataAreaToEdit(data);
    openModalState(nameModals.modalEditAreaState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMAreas(selected);
  };

  const nodeDelete = (data) => (
    <div onClick={() => handleDeleteButton(data)}>
      <storybook.Image src={iconDelete} />
    </div>
  );

  const nodeEdit = (data) => (
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
              name={data.name_area}
              childrenActions={[nodeEdit(data), nodeDelete(data)]}
              options={[
                { title: 'Nombre', value: data.name_area },
                {
                  title: 'Fecha de Creación',
                  value: new Date(data.date_creation).toISOString().slice(0, 10),
                },
                {
                  title: 'Fecha de Modificación',
                  value: new Date(data.date_modification).toISOString().slice(0, 10),
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

export default TableAreasMobile;

TableAreasMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableAreasMobile.defaultProps = {
  list: [],
};
