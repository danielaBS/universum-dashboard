import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalEditDepartment.module.scss';
import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

const ModalEditDepartment = () => {
  const { fetchEditDepartment, openModalState, dataDepartmentToEdit } = useStore(
    (state) => ({
      fetchEditDepartment: state.fetchEditDepartment,
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
    openModalState(nameModals.modalEditDepartmentState);
    fetchEditDepartment(data);
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>EDITAR DEPARTAMENTO</h3>
        <p>Por favor ingrese los siguientes datos para editar el departamento</p>
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
            passedFunction={() => openModalState(nameModals.modalEditDepartmentState)}
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

export default ModalEditDepartment;
