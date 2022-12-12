import React from 'react';
import styles from './table.module.scss';
import PropTypes from 'prop-types';

export const Table = ({ list, colNames }) => {
  return (
    <div className={styles.table_component}>
      <table cellSpacing="0">
        <thead>
          <tr>
            {colNames.map((content, index) => {
              return (
                <th className={styles.th} key={index}>
                  {content}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((content, index) => {
              return (
                <tr key={index}>
                  {Object.values(content).map((value, i) => (
                    <td key={i}>
                      {value ? (typeof value === 'string' ? value : value.toFixed(2)) : '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;

Table.propTypes = {
  list: PropTypes.array.isRequired,
  colNames: PropTypes.array.isRequired,
};

Table.defaultProps = {
  list: [],
  colNames: [],
};
