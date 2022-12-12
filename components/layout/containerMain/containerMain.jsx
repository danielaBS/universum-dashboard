import React from 'react';
import PropTypes from 'prop-types';
import styles from './containerMain.module.scss';

const ContainerMain = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContainerMain;

ContainerMain.propTypes = {
  children: PropTypes.node,
};
ContainerMain.defaultProps = {
  children: null,
};
