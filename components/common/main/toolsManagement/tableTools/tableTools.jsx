import React from 'react';
import styles from './tableTools.module.scss';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import useStore from '@store/index';
const iconArrowRight = '/icons/arrow_right.svg';
import storybook from '@talentumlab/storybook-design-system';
import { useState } from 'react';
import { useEffect } from 'react';
// import useWindowSize from '@hooks/useWindowSize';
// import { BREAKPOINT } from '@consts/index';
import { Fragment } from 'react';
// import { useEffect } from 'react';

const TableTools = ({ list, colNames }) => {
  const {
    pageNumberTools,
    setPageNumberTools,
    setDataToolToAction,
    searchByColumnTool,
    setSearchByTool,
    setViewTool,
    setTypeForm,
    setToolState,
    fetchDataEditPerForm,
    checkedTableToolState,
    isEditTool,
  } = useStore((state) => ({
    pageNumberTools: state.pageNumberTools,
    setPageNumberTools: state.setPageNumberTools,
    setDataToolToAction: state.setDataToolToAction,
    searchByColumnTool: state.searchByColumnTool,
    setSearchByTool: state.setSearchByTool,
    setViewTool: state.setViewTool,
    setTypeForm: state.setTypeForm,
    setToolState: state.setToolState,
    fetchDataEditPerForm: state.fetchDataEditPerForm,
    checkedTableToolState: state.checkedTableToolState,
    isEditTool: state.isEditTool,
  }));

  // const { width } = useWindowSize();

  const [pageCount, setPageCount] = useState(0);

  const [listFiltered, setListFiltered] = useState([]);

  const handleGoButton = (data) => {
    setDataToolToAction(data);
    setViewTool(1);
    setTypeForm('edit');
    data.Formulario === 'Formulario 1' ? setToolState(1) : setToolState(2);
    fetchDataEditPerForm(data.Formulario);
  };

  const handlePageClick = ({ selected }) => {
    setPageNumberTools(selected);
  };

  const usersPerPage = 6; /*inclusión cauca tiene 5 rows por pagina*/
  const pagesVisited = pageNumberTools * usersPerPage;
  // const pageCount = Math.ceil(list.length / usersPerPage);
  const filteredList = list.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
    // console.log(content);
    return content;
  });

  useEffect(() => {
    setPageCount(Math.ceil(list.length / usersPerPage));
  }, [list, usersPerPage]);

  useEffect(() => {
    setPageNumberTools(0);
  }, [setPageNumberTools]);

  useEffect(() => {
    const listChecked = checkedTableToolState.map((data, index) => {
      if (data) {
        return colNames[index];
      } else {
        return false;
      }
    });
    setListFiltered(listChecked.filter((data) => data !== false));
  }, [checkedTableToolState, colNames]);

  // useEffect(() => {
  //   console.log(checkedTableToolState);
  //   console.log(filteredList);
  // }, [checkedTableToolState, filteredList]);

  return (
    <div className={styles.paginate_container}>
      <div className={styles.paginate_container__data_container}>
        <table className={styles.table__periods} cellSpacing="0">
          <thead>
            <tr>
              {listFiltered.map((column, index) => (
                <Fragment key={index}>
                  <th
                    onClick={() => setSearchByTool(column)}
                    className={
                      searchByColumnTool.text === column.text
                        ? `${styles.th} ${styles.th_active}`
                        : styles.th
                    }
                  >
                    {column.text}
                  </th>
                </Fragment>
              ))}
              {/* <th className={styles.th}></th> */}
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((data, index) => (
                <tr key={index}>
                  {checkedTableToolState[0] && (
                    <td>{data.idCuestionarioA || data.idCuestionarioB}</td>
                  )}
                  {checkedTableToolState[1] && <td>{data.Formulario}</td>}
                  {checkedTableToolState[2] && <td>{data.name_aplication}</td>}
                  {checkedTableToolState[3] && <td>{data.title}</td>}
                  {checkedTableToolState[4] && <td>{data.date_creation}</td>}
                  {checkedTableToolState[5] && <td>{data.date_modification}</td>}
                  {checkedTableToolState[6] && <td>{data.department_name}</td>}
                  {checkedTableToolState[7] && <td>{data.town_name}</td>}
                  {checkedTableToolState[8] && <td>{data.name_institution}</td>}
                  {checkedTableToolState[9] && <td>{data.name_sede}</td>}
                  {checkedTableToolState[10] && <td>{data.name_state}</td>}
                  {isEditTool && (
                    <td>
                      <div
                        className={styles.table__periods_icon}
                        onClick={() => handleGoButton(data)}
                      >
                        <div className={styles.go}>Ir</div>
                        <div>
                          <storybook.Image src={iconArrowRight} />
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <span>No se encontraron datos</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <Table list={filteredList} colNames={colNames} /> */}
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
    </div>
  );
};

export default TableTools;

TableTools.propTypes = {
  list: PropTypes.array.isRequired,
  colNames: PropTypes.array.isRequired,
};

TableTools.defaultProps = {
  list: [],
  colNames: [],
};
