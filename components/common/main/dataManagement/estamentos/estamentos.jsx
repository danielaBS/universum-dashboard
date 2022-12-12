import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import styles from './estamentos.module.scss';
const iconSearch = '/icons/search.svg';
// const iconAdd = '/icons/add.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import TableEstamentos from './tableEstamentos/tableEstamentos';
import TableEstamentosMobile from './tableEstamentoMobile/tableEstamentoMobile';
import { BREAKPOINT, columnsTableEstamentos } from '@consts/index';
import useWindowSize from '@hooks/useWindowSize';
import MultipleChecks from '@common/multipleChecks/multipleChecks';

const Estamentos = () => {
  const {
    listAllEstamentos,
    alertEditStatus,
    // isCreateDataManagement,
    pageNumberDMEstamentos,
    checkedTableExecutionState,
    setCheckedExecutionState,
  } = useStore(
    (state) => ({
      listAllEstamentos: state.listAllEstamentos,
      alertEditStatus: state.alertEditStatus,
      // isCreateDataManagement: state.isCreateDataManagement,
      pageNumberDMEstamentos: state.pageNumberDMEstamentos,
      checkedTableExecutionState: state.checkedTableExecutionState,
      setCheckedExecutionState: state.setCheckedExecutionState,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  const [inputSearch, setInputSearch] = useState('');

  // const [rowNumber, setRowNumber] = useState(4);

  const filteredEstamentos = listAllEstamentos.filter((data) => {
    if (inputSearch.length >= 3) {
      return data.name_state.toString().toLowerCase().includes(inputSearch.toLowerCase());
    } else {
      return listAllEstamentos;
    }
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  useEffect(() => {
    if (alertEditStatus) {
      setInputSearch('');
    }
  }, [alertEditStatus]);

  // const usersPerPage = rowNumber; /*inclusión cauca tiene 5 rows por pagina*/
  const usersPerPage = 6;
  const pagesVisited = pageNumberDMEstamentos * usersPerPage;
  const pageCount = Math.ceil(filteredEstamentos.length / usersPerPage);
  const filteredListEstamentos =
    filteredEstamentos.length > 0 ? (
      filteredEstamentos.slice(pagesVisited, pagesVisited + usersPerPage).map((content) => {
        return content;
      })
    ) : (
      <div>No se encontraron datos</div>
    );

  // const valueSelected = (data) => {
  //   var rows = {
  //     'Mostrar: 1': 1,
  //     'Mostrar: 2': 2,
  //     'Mostrar: 3': 3,
  //     'Mostrar: 4': 4,
  //     5: 5,
  //   };
  //   setRowNumber(rows[data.value.name]);
  //   return rows[data.value.name] || rows[5];
  // };

  useEffect(() => {
    let arr = new Array(columnsTableEstamentos.length).fill(false);
    arr[0] = true;
    arr[1] = true;
    arr[2] = true;
    arr[3] = true;
    setCheckedExecutionState(arr);
  }, [setCheckedExecutionState]);

  return (
    <>
      <section className={styles.actions__year}>
        <div>
          <storybook.Search
            leftIcon
            srcIcon={iconSearch}
            inputWidth={width >= BREAKPOINT ? '20rem' : '100%'}
            inputHeight={'36px'}
            onChange={handleChange}
            placeholder="Buscar"
          />
          {width >= BREAKPOINT && (
            <MultipleChecks
              width="auto"
              // valueSelected={(info) => console.log(info)}
              initialValue={checkedTableExecutionState.filter((data) => data === true)}
              options={columnsTableEstamentos.map((data) => ({
                id: data.id,
                name: data.text,
              }))}
              checkedState={checkedTableExecutionState}
              setCheckedState={setCheckedExecutionState}
              iconSearch={iconSearch}
            />
          )}
        </div>
        {/* <div>
          {isCreateDataManagement && (
            <storybook.ButtonCommon
              text="CREAR"
              width="8rem"
              height="36px"
              showIcon
              iconButton={iconAdd}
              borderradius="5px"
              passedFunction={() => {}}
            />
          )}
        </div> */}
      </section>
      <section className={styles.table__years}>
        {width >= BREAKPOINT ? (
          <TableEstamentos
            list={filteredListEstamentos}
            pageCount={pageCount}
            colNames={columnsTableEstamentos}
          />
        ) : (
          <TableEstamentosMobile
            list={filteredListEstamentos}
            pageCount={8}
            colNames={columnsTableEstamentos}
          />
        )}
      </section>
    </>
  );
};

export default Estamentos;
