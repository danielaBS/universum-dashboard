import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalCreateTown.module.scss';
import { useForm } from 'react-hook-form';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search.svg';
// import { useEffect } from 'react';

const ModalCreateTown = () => {
  const { fetchCreateTown, openModalState, listAllDepartments } = useStore(
    (state) => ({
      fetchCreateTown: state.fetchCreateTown,
      openModalState: state.openModalState,
      listAllDepartments: state.listAllDepartments,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [valueDepartment, setValueDepartment] = useState({
    value: { id: -1, name: 'Seleccionar' },
    id: 'Seleccionar',
  });

  const [errorsDrop, setErrorsDrop] = useState({
    department: null,
  });

  const onSubmit = async (data) => {
    if (valueDepartment.value.id === -1) {
      setErrorsDrop((state) => ({ ...state, department: 'Este campo es obligatorio' }));
    } else {
      openModalState(nameModals.modalCreateTownState);
      fetchCreateTown({ ...data, departamentoId: valueDepartment.value.id });
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>CREAR MUNICIPIO</h3>
        <p>Por favor ingrese los siguientes datos para crear un municipio</p>
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
            passedFunction={() => openModalState(nameModals.modalCreateTownState)}
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

export default ModalCreateTown;
