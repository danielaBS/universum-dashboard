import React from 'react';
import PropTypes from 'prop-types';
import styles from './iconButton.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import { nameModals } from '@consts/index';

const IconButton = ({ icon, title, content }) => {
  const { openModalState, setHelpModalIconRoute, setHelpModalTitle, setHelpModalContent } =
    useStore(
      (state) => ({
        openModalState: state.openModalState,
        setHelpModalIconRoute: state.setHelpModalIconRoute,
        setHelpModalTitle: state.setHelpModalTitle,
        setHelpModalContent: state.setHelpModalContent,
      }),
      shallow,
    );

  const handleModal = () => {
    openModalState(nameModals.modalHelpState);
    setHelpModalIconRoute(icon);
    setHelpModalTitle(title);
    setHelpModalContent(content);
  };
  return (
    <div className={styles.container} onClick={() => handleModal()}>
      <storybook.Image src={icon} />
      <h3>{title}</h3>
    </div>
  );
};

IconButton.propTypes = {
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
};

IconButton.defaultProps = {
  icon: 'any',
  title: '',
  content: <></>,
};

export default IconButton;
