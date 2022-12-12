import React, { useEffect, useState } from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableInstitutionsMobile.module.scss';
import PropTypes from 'prop-types';
const iconOptions = '/icons/optionMenu.svg';
const iconSearch = '/icons/search_input.svg';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals, optionsDatamanagement } from '@consts/index';
import ReactPaginate from 'react-paginate';

const TableInstitutionsMobile = ({ list, pageCount }) => {
  const {
    openModalState,
    setDataInstitutionToEdit,
    isEditDataManagement,
    isDeleteDataManagement,
    setPageNumberDMInstitutions,
    setDownloadType,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      isEditDataManagement: state.isEditDataManagement,
      isDeleteDataManagement: state.isDeleteDataManagement,
      setDataInstitutionToEdit: state.setDataInstitutionToEdit,
      setPageNumberDMInstitutions: state.setPageNumberDMInstitutions,
      setDownloadType: state.setDownloadType,
    }),
    shallow,
  );

  const [options, setOptions] = useState(optionsDatamanagement);

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
    setDataInstitutionToEdit(data);
    openModalState(nameModals.modalEditSedeState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberDMInstitutions(selected);
  };

  //   const nodeDelete = (data) => (
  //     <div onClick={() => handleDeleteButton(data)}>
  //       <storybook.Image src={iconDelete} />
  //     </div>
  //   );

  // const nodeEdit = (data) => (
  //   <div onClick={() => handleEditButton(data)}>
  //     <storybook.Image src={iconEdit} />
  //   </div>
  // );

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
              name={data.name_institution}
              childrenActions={[nodeOptions(data)]}
              options={[
                { title: 'Nombre', value: data.name_institution },
                { title: 'Sede	', value: data.name_headquarter },
                {
                  title: 'Dane',
                  value: data.num_dane,
                },
                {
                  title: 'Fecha de creación',
                  value: data.date_creation,
                },
                { title: 'Fecha de modificación', value: data.date_modification },
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

export default TableInstitutionsMobile;

TableInstitutionsMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableInstitutionsMobile.defaultProps = {
  list: [],
};
