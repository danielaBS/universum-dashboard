import React from 'react';
import styles from './title.module.scss';
import PropTypes from 'prop-types';

const Title = ({ text }) => {
  return <h2 className={styles.title}>{text}</h2>;
};

export default Title;

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

Title.defaultProps = {
  text: 'Something',
};
