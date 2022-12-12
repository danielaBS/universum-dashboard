import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalDeleteYear.module.scss';
import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

const ModalDeleteYear = () => {
  const { fetchDeleteYear, openModalState } = useStore(
    (state) => ({
      fetchDeleteYear: state.fetchDeleteYear,
      openModalState: state.openModalState,
    }),
    shallow,
  );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    openModalState(nameModals.modalDeleteYearState);
    fetchDeleteYear();
  };

  return (
    <div className={styles.modal_body}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Eliminar año</div>
        <div className={styles.title_input}>
          ¿Está seguro que desea eliminar este año de forma permanente?, esta acción no se puede
          deshacer
        </div>
        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalDeleteYearState)}
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

export default ModalDeleteYear;
