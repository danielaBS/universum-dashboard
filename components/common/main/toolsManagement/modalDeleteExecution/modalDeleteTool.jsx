import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalDeleteTool.module.scss';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
// import { useEffect } from 'react';

const ModalDeleteTool = () => {
  const { user } = useAuth();
  const { fetchDeleteToolA, fetchDeleteToolB, openModalState, toolState, setViewTool } = useStore(
    (state) => ({
      fetchDeleteToolA: state.fetchDeleteToolA,
      fetchDeleteToolB: state.fetchDeleteToolB,
      openModalState: state.openModalState,
      toolState: state.toolState,
      setViewTool: state.setViewTool,
    }),
    shallow,
  );

  const { handleSubmit } = useForm();

  const deleteButton = () => {
    toolState === 1 ? fetchDeleteToolA(user) : fetchDeleteToolB(user);
    openModalState(nameModals.modalDeleteToolState);
    setViewTool(0);
  };

  const onSubmit = async () => {
    deleteButton();
  };

  return (
    <div className={styles.modal_body}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Eliminar cuestionario</div>
        <div className={styles.text}>
          ¿Está seguro que desea eliminar el cuestionario?, esta acción eliminara todas las
          respuestas de manera permanente
        </div>
        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalDeleteToolState)}
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

export default ModalDeleteTool;
