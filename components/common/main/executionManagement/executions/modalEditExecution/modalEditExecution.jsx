import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import { nameModals } from '@consts/index';
import styles from './modalEditExecution.module.scss';
import { useForm } from 'react-hook-form';
import useStore from '@store/index';

const ModalEditExecution = () => {
  const { openModalState } = useStore(
    (state) => ({
      openModalState: state.openModalState,
    }),
    shallow,
  );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    openModalState(nameModals.modalEditExecutionState);
  };
  return (
    <div className={styles.modal_body}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Editar estado de la ejecución</div>
        <div className={styles.text}>
          ¿Está seguro que desea cambiar el estado de la ejecución la ejecución de forma
          permanente?, esta acción no se puede deshacer?
        </div>
        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalEditExecutionState)}
          />
          <storybook.ButtonCommon
            text="ACEPTAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            type="submit"
            //   passedFunction={handleEdit}
          />
        </div>
      </form>
    </div>
  );
};

export default ModalEditExecution;
