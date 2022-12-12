import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalEditEstamentos.module.scss';
import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

const ModalEditEstamentos = () => {
  const { fetchEditEstamento, openModalState, dataDepartmentToEdit } = useStore(
    (state) => ({
      fetchEditEstamento: state.fetchEditEstamento,
      openModalState: state.openModalState,
      dataDepartmentToEdit: state.dataDepartmentToEdit,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const setValuesInUpdate = () => {
      setValue('department_name', dataDepartmentToEdit.department_name);
    };
    setValuesInUpdate();
  }, [dataDepartmentToEdit, setValue]);

  const onSubmit = async (data) => {
    fetchEditEstamento(data);
    openModalState(nameModals.modalEditEstamentoState);
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>EDITAR ESTAMENTO</h3>
        <p>Por favor ingrese los siguientes datos para editar el estamento</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre estamento
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            inputHeight="2rem"
            type="text"
            id="name_state"
            register={register}
          />
          {errors.name_state && (
            <span role="alert" className={styles.error}>
              {errors.name_state.message}
            </span>
          )}
        </div>

        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalEditEstamentoState)}
          />
          <storybook.ButtonCommon
            text="GUARDAR"
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

export default ModalEditEstamentos;
