import React, { useEffect } from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableUsersMobile.module.scss';
import PropTypes from 'prop-types';
const iconEdit = '/icons/edit.svg';
const iconDelete = '/icons/delete.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals } from '@consts/index';
import ReactPaginate from 'react-paginate';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/breakpoint';

const TableUsersMobile = ({ list, pageCount, setPageNumber, reset, setReset }) => {
  const {
    setDataUserToEdit,
    setViewUser,
    setDataUserToDelete,
    openModalState,
    pageNumberExecutions,
  } = useStore(
    (state) => ({
      setDataUserToEdit: state.setDataUserToEdit,
      setViewUser: state.setViewUser,
      setDataUserToDelete: state.setDataUserToDelete,
      openModalState: state.openModalState,
      fetchEditUser: state.fetchEditUser,
      pageNumberExecutions: state.pageNumberExecutions,
      cleanFiltersExecution: state.cleanFiltersExecution,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  const handleEditButton = (data) => {
    setViewUser(2);
    setDataUserToEdit(data.id);
  };

  const handleDeleteButton = (data) => {
    setDataUserToDelete(data);
    openModalState(nameModals.modalDeleteUsersState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
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
    <>
      <div className={styles.tableMobile}>
        {list.length > 0 &&
          list.map((data, index) => (
            <DropdownTable
              key={index}
              name={data.username}
              childrenActions={[nodeEdit(data), nodeDelete(data)]}
              options={[
                { title: 'Id', value: data.id },
                { title: 'Usuario', value: data.username },
                { title: 'Nombre (s)', value: data.first_name },
                {
                  title: 'Apellido (s)',
                  value: data.last_name,
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
    </>
  );
};

export default TableUsersMobile;

TableUsersMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableUsersMobile.defaultProps = {
  list: [],
};
