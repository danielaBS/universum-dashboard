import React from 'react';
import PropTypes from 'prop-types';
import storybook from '@talentumlab/storybook-design-system';
import styles from './tableSection.module.scss';
const iconSearch = '/icons/search.svg';
const iconArrow = '/icons/arrow_dropdown.svg';
import Paginate from './paginate/paginate';
import { useState } from 'react';
import { BREAKPOINT } from '@consts/breakpoint';
import useWindowSize from '@hooks/useWindowSize';

const TableSection = ({
  list,
  colNames,
  title,
  subtitle,
  type,
  listContent,
  loading,
  storeIndicator,
}) => {
  const { width } = useWindowSize();

  const [rowNumber, setRowNumber] = useState(4);
  const [reset, setReset] = useState(false);

  const valueSelected = (data) => {
    setReset(true);
    const rows = {
      'Mostrar: 1': 1,
      'Mostrar: 2': 2,
      'Mostrar: 3': 3,
      'Mostrar: 4': 4,
      5: 5,
    };
    setRowNumber(rows[data.value.name]);
    return rows[data.value.name] || rows[5];
  };

  return (
    <>
      {listContent.find((node) => node.name === title) &&
        listContent.find((node) => node.name === title).state && (
          <div
            className={loading ? `${styles.table} ${styles.animation_lazy}` : styles.table}
            style={type === 'report' ? { marginBottom: '0rem', padding: '1rem 0' } : null}
          >
            {!loading && (
              <>
                <h2>{title}</h2>
                <h4>{subtitle}</h4>
                {type !== 'report' && (
                  <div className={styles.table__search_dropdown}>
                    <div className={styles.search}>
                      <storybook.Search leftIcon inputHeight={'36px'} srcIcon={iconSearch} />
                    </div>
                    <div className={styles.dropdown}>
                      <storybook.DropDownV2
                        width="auto"
                        srcDown={iconArrow}
                        height={'36px'}
                        valueSelected={valueSelected}
                        initialValue={{
                          value: {
                            id: 0,
                            name: width >= BREAKPOINT ? 'Mostrar: ' + rowNumber : rowNumber,
                          },
                          id: 'Mostrar: ' + rowNumber,
                        }}
                        options={[
                          { id: 0, name: 'Mostrar: 1' },
                          { id: 1, name: 'Mostrar: 2' },
                          { id: 2, name: 'Mostrar: 3' },
                          { id: 3, name: 'Mostrar: 4' },
                        ]}
                      />
                    </div>
                  </div>
                )}
                <Paginate
                  list={list}
                  colNames={colNames}
                  rowNumber={rowNumber}
                  type={type}
                  title={title}
                  listContent={listContent}
                  storeIndicator={storeIndicator}
                  reset={reset}
                  setReset={setReset}
                />
              </>
            )}
          </div>
        )}
    </>
  );
};

export default TableSection;

TableSection.propTypes = {
  list: PropTypes.array.isRequired,
  colNames: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  listContent: PropTypes.array.isRequired,
  checkedState: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

TableSection.defaultProps = {
  list: [],
  colNames: [],
  title: 'Here goes title',
  subtitle: 'here goes subtitle content',
  listContent: [],
  checkedState: [],
  type: 'dashboard',
};
