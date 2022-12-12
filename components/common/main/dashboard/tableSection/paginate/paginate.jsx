import React, { useEffect, useState } from 'react';
import styles from './paginate.module.scss';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import Table from './table/table';
import CheckboxList from '@common/checkboxList/checkboxList';
import shallow from 'zustand/shallow';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/breakpoint';

const Paginate = ({
  list,
  colNames,
  rowNumber,
  type,
  title,
  listContent,
  storeIndicator,
  reset,
  setReset,
}) => {
  const {
    checkedState,
    handleChange,
    pageNumberIndiceArea,
    pageNumberIndiceProceso,
    pageNumberTotalArea,
    pageNumberTotalProceso,
    pageNumberTotalVariable,
    setPageNumberIndiceArea,
    setPageNumberIndiceProceso,
    setPageNumberTotalArea,
    setPageNumberTotalProceso,
    setPageNumberTotalVariable,
  } = useStore(
    (state) => ({
      checkedState: state.checkedState,
      handleChange: state.handleChange,
      pageNumberIndiceArea: state.pageNumberIndiceArea,
      pageNumberIndiceProceso: state.pageNumberIndiceProceso,
      pageNumberTotalArea: state.pageNumberTotalArea,
      pageNumberTotalProceso: state.pageNumberTotalProceso,
      pageNumberTotalVariable: state.pageNumberTotalVariable,
      setPageNumberIndiceArea: state.setPageNumberIndiceArea,
      setPageNumberIndiceProceso: state.setPageNumberIndiceProceso,
      setPageNumberTotalArea: state.setPageNumberTotalArea,
      setPageNumberTotalProceso: state.setPageNumberTotalProceso,
      setPageNumberTotalVariable: state.setPageNumberTotalVariable,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  const [pageNumber, setPageNumber] = useState(0);

  const handlePageClick = ({ selected }) => {
    console.log(selected);
    const setPageStore = () => {
      const rows = {
        1: () => {
          setPageNumberIndiceArea(selected);
        },
        2: () => {
          setPageNumberIndiceProceso(selected);
        },
        3: () => {
          setPageNumberTotalArea(selected);
        },
        4: () => {
          setPageNumberTotalProceso(selected);
        },
        5: () => {
          setPageNumberTotalVariable(selected);
        },
      };
      return rows[storeIndicator]() || null;
    };
    setPageStore();
  };

  useEffect(() => {
    const setPageStore = () => {
      const rows = {
        1: () => setPageNumber(pageNumberIndiceArea),
        2: () => setPageNumber(pageNumberIndiceProceso),
        3: () => setPageNumber(pageNumberTotalArea),
        4: () => setPageNumber(pageNumberTotalProceso),
        5: () => setPageNumber(pageNumberTotalVariable),
      };
      return rows[storeIndicator]() || null;
    };
    setPageStore();
  }, [
    storeIndicator,
    pageNumberIndiceArea,
    pageNumberIndiceProceso,
    pageNumberTotalArea,
    pageNumberTotalProceso,
    pageNumberTotalVariable,
  ]);

  useEffect(() => {
    setPageNumber(0);
  }, []);

  useEffect(() => {
    if (reset) {
      setPageNumber(0);
      setReset(false);
    }
  }, [reset, setReset]);

  const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(list.length / usersPerPage);
  const filteredList =
    list.length > 0 ? (
      list.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
        return content;
      })
    ) : (
      <div>No se encontraron datos</div>
    );

  useEffect(() => {
    // console.log('first pagenumber', pageNumberIndiceArea);
    console.log('pageNumberIndiceArea: ', pageNumberIndiceArea);
    // console.log('third pagenumber', pageNumberTotalArea);
    // console.log('fourth pagenumber', pageNumberTotalProceso);
    // console.log('fifth pagenumber', pageNumberTotalVariable);
    console.log('inner pageNumber: ', pageNumber);
    console.log('pagesVisited: ', pagesVisited);
    // console.log('filteredList: ', filteredList);
  }, [
    pageNumberIndiceArea,
    // pageNumberIndiceProceso,
    // pageNumberTotalArea,
    // pageNumberTotalProceso,
    // pageNumberTotalVariable,
    pageNumber,
    pagesVisited,
    // filteredList,
  ]);

  return (
    <div className={styles.paginate_container}>
      <div className={styles.paginate_container__data_container}>
        <Table list={filteredList} colNames={colNames} />
      </div>
      <div className={styles.paginate_check}>
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
          forcePage={pageNumber}
        />
        {type !== 'report' && (
          <div className={styles.checks_report}>
            <CheckboxList
              checked={checkedState[listContent.findIndex((obj) => obj.name === title)]}
              idCheckbox={listContent.find((obj) => obj.name === title).id}
              onChange={(e) => handleChange(e, listContent)}
            />
            <label htmlFor={listContent.find((obj) => obj.name === title).id}>
              Agregar al informe
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paginate;

Paginate.propTypes = {
  list: PropTypes.array.isRequired,
  colNames: PropTypes.array.isRequired,
  rowNumber: PropTypes.number.isRequired,
};

Paginate.defaultProps = {
  list: [],
  colNames: [],
  rowNumber: 4,
};
