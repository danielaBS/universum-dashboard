import React, { useEffect, useState } from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableTownsMobile.module.scss';
import PropTypes from 'prop-types';
const iconOptions = '/icons/optionMenu.svg';
const iconSearch = '/icons/search_input.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals, optionsTownDatamanagement } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableTownsMobile = ({ list, pageCount }) => {
  const {
    openModalState,
    setDataTownToEdit,
    setDataTownToDelete,
    isEditDataManagement,
    isDeleteDataManagement,
    setPageNumberDMTowns,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      setDataTownToEdit: state.setDataTownToEdit,
      setDataTownToDelete: state.setDataTownToDelete,
      isEditDataManagement: state.isDeleteDataManagement,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setPageNumberDMTowns: state.setPageNumberDMTowns,
    }),
    shallow,
  );

  const [options, setOptions] = useState(optionsTownDatamanagement);

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
  const handlePageClick = ({ selected }) => {
    setPageNumberDMTowns(selected);
  };
  // const nodeDelete = (data) =>
  //   isDeleteDataManagement && (
  //     <div onClick={() => handleDeleteButton(data)}>
  //       <storybook.Image src={iconDelete} />
  //     </div>
  //   );

  // const nodeEdit = (data) =>
  //   isEditDataManagement && (
  //     <div onClick={() => handleEditButton(data)}>
  //       <storybook.Image src={iconEdit} />
  //     </div>
  //   );

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

  const nodeOptions = (data) => (
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
  );
  return (
    <>
      <div className={styles.tableMobile}>
        {list.length > 0 &&
          list.map((data, index) => (
            <DropdownTable
              key={index}
              name={data.town_name}
              childrenActions={[nodeOptions(data)]}
              options={[
                { title: 'ID', value: data.idTown },
                { title: 'Nombre', value: data.town_name },
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

export default TableTownsMobile;

TableTownsMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableTownsMobile.defaultProps = {
  list: [],
};
