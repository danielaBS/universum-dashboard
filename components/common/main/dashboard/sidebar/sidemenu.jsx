import React from 'react';
import PropTypes from 'prop-types';
import styles from './sidemenu.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import FilterComponent from '../filterComponent/filterComponent';

const SideMenu = ({ years, ejecuciones, institutions, estamentos, areas }) => {
  // const openNav = () => {};
  const closeNav = () => {};
  return (
    <div>
      <div id="sidebar" className="sidebar">
        <a href="javascript:void(0)" className={styles.close_button} onClick={() => closeNav()}></a>
        <h2>Filtros</h2>
        <div className={styles.filters__content}>
          <FilterComponent title={'Año'} dropdownText={'Todos'} options={years} />

          <FilterComponent title={'Ejecución'} dropdownText={'Todas'} options={ejecuciones} />

          <FilterComponent title={'Instituciones'} dropdownText={'Todos'} options={institutions} />

          <FilterComponent title={'Estamentos'} dropdownText={'Todos'} options={estamentos} />

          <FilterComponent title={'Área'} dropdownText={'Todas'} options={areas} />
        </div>
        <storybook.ButtonCommon
          text="Filtrar"
          width="8rem"
          height="36px"
          bgColor={'white'}
          color="#00A4AD"
          border="1px solid #00A4AD"
          borderradius="5px"
          passedFunction={() => {}}
        />
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  years: PropTypes.array.isRequired,
  ejecuciones: PropTypes.array.isRequired,
  institutions: PropTypes.array.isRequired,
  estamentos: PropTypes.array.isRequired,
  areas: PropTypes.array.isRequired,
};

SideMenu.defaultProps = {
  years: [],
  ejecuciones: [],
  institutions: [],
  estamentos: [],
  areas: [],
};
export default Sidebar;
