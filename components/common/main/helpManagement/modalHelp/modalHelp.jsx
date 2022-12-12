import useStore from '@store/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalHelp.module.scss';
// import { useEffect } from 'react';

const ModalHelp = () => {
  const { helpModalIcon, helpModalTitle, helpModalContent } = useStore(
    (state) => ({
      helpModalIcon: state.helpModalIcon,
      helpModalTitle: state.helpModalTitle,
      helpModalContent: state.helpModalContent,
    }),
    shallow,
  );

  return (
    <div className={styles.modal_body}>
      <div className={styles.modal_title}>
        <storybook.Image src={helpModalIcon} />
        <p>{helpModalTitle}</p>
      </div>
      {helpModalContent}
    </div>
  );
};

export default ModalHelp;
