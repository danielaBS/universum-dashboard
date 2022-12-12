import React from 'react';
import styles from './success.module.scss';
import storybook from '@talentumlab/storybook-design-system';
const iconSuccess = '/icons/success.svg';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import { useAuth } from '@hooks/useAuth';

const Success = () => {
  const { user } = useAuth();
  const {
    setViewTool,
    typeForm,
    cleanFiltersTool,
    cleanFiltersForm,
    setCleanBasicData,
    fetchAllTools,
  } = useStore(
    (state) => ({
      setViewTool: state.setViewTool,
      typeForm: state.typeForm,
      cleanFiltersTool: state.cleanFiltersTool,
      cleanFiltersForm: state.cleanFiltersForm,
      setCleanBasicData: state.setCleanBasicData,
      fetchAllTools: state.fetchAllTools,
    }),
    shallow,
  );

  const handleNext = () => {
    setViewTool(0);
    cleanFiltersTool(user);
    cleanFiltersForm(user);
    setCleanBasicData();
    fetchAllTools(user);
  };

  return (
    <div className={styles.container}>
      <div>
        <storybook.Image src={iconSuccess} />
      </div>
      <div>
        <h4>Haz finalizado el cuestionario.</h4>
        {typeForm === 'create' ? (
          <p>Se han guardado con exitosamente las respuestas.</p>
        ) : (
          <p>Se han editado exitosamente las respuestas.</p>
        )}
      </div>
      <div className={styles.button_next}>
        <storybook.ButtonCommon
          text="SIGUIENTE"
          width={'148px'}
          passedFunction={() => handleNext()}
          borderradius="5px"
        />
      </div>
    </div>
  );
};

export default Success;
