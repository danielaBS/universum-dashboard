import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalDeleteTown.module.scss';
import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

const ModalDeleteTown = () => {
  const { fetchDeleteTown, openModalState } = useStore(
    (state) => ({
      fetchDeleteTown: state.fetchDeleteTown,
      openModalState: state.openModalState,
    }),
    shallow,
  );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    fetchDeleteTown();
    openModalState(nameModals.modalDeleteTownState);
  };

  return (
    <div className={styles.modal_body}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Eliminar municipio</div>
        <div className={styles.title_input}>
          ¿Está seguro que desea eliminar este municipio de forma permanente?, esta acción no se
          puede deshacer
        </div>
        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalDeleteTownState)}
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

export default ModalDeleteTown;
