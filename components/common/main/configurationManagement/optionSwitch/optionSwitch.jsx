import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import styles from './optionSwitch.module.scss';

const OptionSwitch = ({ title, option, text, checked }) => {
  const { setValueParameter } = useStore((state) => ({
    setValueParameter: state.setValueParameter,
  }));
  return (
    <div className={styles.container}>
      <div className={styles.container_text}>
        <p>{title}</p>
        <p>{text}</p>
      </div>
      <storybook.ToggleSwitch
        onChange={() => setValueParameter(option, checked)}
        checked={checked}
      />
    </div>
  );
};

export default OptionSwitch;
