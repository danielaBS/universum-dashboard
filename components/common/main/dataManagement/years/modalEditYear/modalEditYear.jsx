import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalEditYear.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const ModalEditYear = () => {
  const { dataYearToEdit, fetchEditYear, openModalState } = useStore(
    (state) => ({
      dataYearToEdit: state.dataYearToEdit,
      fetchEditYear: state.fetchEditYear,
      openModalState: state.openModalState,
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
      setValue('title', dataYearToEdit.title);
      setValue('description', dataYearToEdit.description);
    };
    setValuesInUpdate();
  }, [dataYearToEdit, setValue]);

  const onSubmit = async (data) => {
    openModalState(nameModals.modalEditYearState);
    fetchEditYear(data);
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>EDITAR AÑO</h3>
        <p>Por favor ingrese los siguientes datos para editar el año</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Año
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            type="text"
            id="title"
            register={register}
          />
          {errors.title && (
            <span role="alert" className={styles.error}>
              {errors.title.message}
            </span>
          )}
        </div>

        <div className={styles.title_input}>Descripción</div>
        <div className={styles.modal_text_area}>
          <textarea
            {...register('description', {})}
            name="description"
            className={styles.description}
            id="description"
            placeholder="Añadir una descripción"
            cols="30"
            rows="7"
          ></textarea>
        </div>
        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalEditYearState)}
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

export default ModalEditYear;
