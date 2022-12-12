import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalEditArea.module.scss';
import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

const ModalEditArea = () => {
  const { fetchEditAreas, openModalState, dataAreaToEdit } = useStore(
    (state) => ({
      fetchEditAreas: state.fetchEditAreas,
      openModalState: state.openModalState,
      dataAreaToEdit: state.dataAreaToEdit,
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
      setValue('name_area', dataAreaToEdit.name_area);
    };
    setValuesInUpdate();
  }, [dataAreaToEdit, setValue]);

  const onSubmit = async (data) => {
    fetchEditAreas(data);
    openModalState(nameModals.modalEditAreaState);
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>EDITAR ÁREA</h3>
        <p>Por favor ingrese los siguientes datos para editar el área</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre área
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            inputHeight="2rem"
            type="text"
            id="name_area"
            register={register}
          />
          {errors.name_area && (
            <span role="alert" className={styles.error}>
              {errors.name_area.message}
            </span>
          )}
        </div>

        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="2.25rem"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalEditAreaState)}
          />
          <storybook.ButtonCommon
            text="GUARDAR"
            width="8rem"
            height="2.25rem"
            borderradius="5px"
            type="submit"
            //   passedFunction={handleEdit}
          />
        </div>
      </form>
    </div>
  );
};

export default ModalEditArea;
