import React, { useEffect, useState } from 'react';
import DropdownTable from '@common/dropdownTable/dropdownTable';
import styles from './tableExecutionsMobile.module.scss';
import PropTypes from 'prop-types';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { nameModals } from '@consts/index';
import { capitalizeStr } from '@hooks/capitalizeString';
import ReactPaginate from 'react-paginate';
import useWindowSize from '@hooks/useWindowSize';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search_input.svg';
import { BREAKPOINT } from '@consts/breakpoint';
const iconOptions = '/icons/optionMenu.svg';
import { optionsReportsExecution } from '@consts/optionsReports';

const TableExecutionsMobile = ({ list, pageCount, setPageNumber, reset, setReset }) => {
  const {
    setDataExecutionToEdit,
    setViewExecution,
    setDataExecutionToDelete,
    openModalState,
    fetchEditExecutionState,
    isDeleteExecution,
    isEditExecution,
    isStateUpdatedExecution,
    pageNumberExecutions,
    cleanFiltersExecution,
    fetchDownloadExecutionCuestionarios,
    fetchDownloadExecutionReport,
  } = useStore(
    (state) => ({
      setDataExecutionToEdit: state.setDataExecutionToEdit,
      setViewExecution: state.setViewExecution,
      setDataExecutionToDelete: state.setDataExecutionToDelete,
      openModalState: state.openModalState,
      fetchEditExecutionState: state.fetchEditExecutionState,
      isDeleteExecution: state.isDeleteExecution,
      isEditExecution: state.isEditExecution,
      isStateUpdatedExecution: state.isStateUpdatedExecution,
      pageNumberExecutions: state.pageNumberExecutions,
      cleanFiltersExecution: state.cleanFiltersExecution,
      fetchDownloadExecutionCuestionarios: state.fetchDownloadExecutionCuestionarios,
      fetchDownloadExecutionReport: state.fetchDownloadExecutionReport,
    }),
    shallow,
  );

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

  const handleDeleteButton = (data) => {
    setDataExecutionToDelete(data);
    openModalState(nameModals.modalDeleteExecutionState);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
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

  // const nodeDelete = (data) =>
  //   isDeleteExecution && (
  //     <div onClick={() => handleDeleteButton(data)}>
  //       <storybook.Image src={iconDelete} />
  //     </div>
  //   );

  // const nodeEdit = (data) => (
  //   <div onClick={() => handleEditButton(data)}>
  //     <storybook.Image src={iconEdit} />
  //   </div>
  // );

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

  const nodeState = (data) =>
    isStateUpdatedExecution ? (
      <div className={styles.state} style={{ marginTop: '1rem' }}>
        <storybook.DropDownV2
          minWidth="1rem"
          srcDown={iconArrow}
          width="6.4rem"
          height="36px"
          // backgroundColor
          initialValue={{ value: { id: 0, name: capitalizeStr(data.state) }, id: '' }}
          className={data.state.toLowerCase() === 'cerrado' ? styles.closed : styles.open}
          valueSelected={(info) =>
            fetchEditExecutionState({
              state: info.value.name,
              idEjecution: data.idEjecution,
            })
          }
          dropdownGap={1}
          options={[
            {
              id: 0,
              name: 'ABIERTO',
            },
            {
              id: 1,
              name: 'CERRADO',
            },
          ]}
        />
      </div>
    ) : (
      <div className={styles.state}>
        <div
          className={
            data.state.toLowerCase() === 'cerrado' ? styles.closed_common : styles.open_common
          }
        >
          {capitalizeStr(data.state)}
        </div>
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
              name={data.name_aplication}
              childrenActions={[nodeOptions(data)]}
              options={[
                { title: 'Id', value: data.idEjecution },
                { title: 'Descripción', value: data.description },
                { title: 'Año', value: data.title },
                {
                  title: 'Fecha de inicio',
                  value: data.date_start,
                },
                { title: 'Fecha de fin', value: data.date_end },
                { title: 'Estado', value: nodeState(data) },
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

export default TableExecutionsMobile;

TableExecutionsMobile.propTypes = {
  list: PropTypes.array.isRequired,
};

TableExecutionsMobile.defaultProps = {
  list: [],
};
