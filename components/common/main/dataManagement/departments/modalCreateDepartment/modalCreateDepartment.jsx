import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalCreateDepartment.module.scss';
import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

const ModalCreateDepartment = () => {
  const { fetchCreateDepartment, openModalState } = useStore(
    (state) => ({
      fetchCreateDepartment: state.fetchCreateDepartment,
      openModalState: state.openModalState,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    openModalState(nameModals.modalCreateDepartmentState);
    fetchCreateDepartment(data);
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>CREAR DEPARTAMENTO</h3>
        <p>Por favor ingrese los siguientes datos para crear un departamento</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre departamento
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            inputHeight="2rem"
            type="text"
            id="department_name"
            register={register}
          />
          {errors.department_name && (
            <span role="alert" className={styles.error}>
              {errors.department_name.message}
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
            passedFunction={() => openModalState(nameModals.modalCreateDepartmentState)}
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

export default ModalCreateDepartment;
