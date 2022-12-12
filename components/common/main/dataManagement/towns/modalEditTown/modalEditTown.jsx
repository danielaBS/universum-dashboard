import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalEditTown.module.scss';
import { useForm } from 'react-hook-form';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search.svg';
// import { useEffect } from 'react';

const ModalEditTown = () => {
  const { fetchEditTown, openModalState, dataTownToEdit, listAllDepartments } = useStore(
    (state) => ({
      fetchEditTown: state.fetchEditTown,
      openModalState: state.openModalState,
      dataTownToEdit: state.dataTownToEdit,
      listAllDepartments: state.listAllDepartments,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [valueDepartment, setValueDepartment] = useState({
    value: { id: -1, name: 'Seleccionar' },
    id: 'Seleccionar',
  });

  const [errorsDrop, setErrorsDrop] = useState({
    department: null,
  });

  useEffect(() => {
    const setValuesInUpdate = () => {
      setValue('town_name', dataTownToEdit.town_name);
      setValueDepartment({
        value: { id: dataTownToEdit.departamentoId, name: 'Seleccionar' },
        id: 'Seleccionar',
      });
    };
    setValuesInUpdate();
  }, [dataTownToEdit, setValue]);

  const onSubmit = async (data) => {
    if (valueDepartment.value.id === -1) {
      setErrorsDrop((state) => ({ ...state, department: 'Este campo es obligatorio' }));
    } else {
      openModalState(nameModals.modalEditTownState);
      fetchEditTown({ ...data, departamentoId: valueDepartment.value.id });
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>EDITAR MUNICIPIO</h3>
        <p>Por favor ingrese los siguientes datos para editar el municipio</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre municipio
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            inputHeight="2rem"
            type="text"
            id="town_name"
            register={register}
          />
          {errors.town_name && (
            <span role="alert" className={styles.error}>
              {errors.town_name.message}
            </span>
          )}
        </div>

        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Departamento
        </div>
        <div className={styles.modal_dropdown}>
          <storybook.DropDownV2
            srcDown={iconArrow}
            width="100%"
            height="36px"
            valueSelected={(data) => setValueDepartment(data)}
            initialValue={valueDepartment}
            options={listAllDepartments.map((data) => ({
              id: data.idDepartment,
              name: data.department_name,
            }))}
            iconSearch={iconSearch}
          />
          {errorsDrop.department && (
            <span role="alert" className={styles.error}>
              {errorsDrop.department}
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
            passedFunction={() => openModalState(nameModals.modalEditTownState)}
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

export default ModalEditTown;
