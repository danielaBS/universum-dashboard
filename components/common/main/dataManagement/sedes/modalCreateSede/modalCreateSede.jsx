import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalCreateSede.module.scss';
import { useForm } from 'react-hook-form';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search.svg';
// import { useEffect } from 'react';

const ModalCreateSede = () => {
  const { fetchCreateSede, openModalState, listAllTowns, listAllInstitutions } = useStore(
    (state) => ({
      fetchCreateSede: state.fetchCreateSede,
      openModalState: state.openModalState,
      listAllTowns: state.listAllTowns,
      listAllInstitutions: state.listAllInstitutions,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [valueTown, setValueTown] = useState({
    value: { id: -1, name: 'Seleccionar' },
    id: 'Seleccionar',
  });

  const [valueInstitution, setValueInstitution] = useState({
    value: { id: -1, name: 'Seleccionar' },
    id: 'Seleccionar',
  });

  const [errorsDrop, setErrorsDrop] = useState({
    town: null,
    institution: null,
  });

  const onSubmit = async (data) => {
    if (valueTown.value.id === -1) {
      setErrorsDrop((state) => ({ ...state, town: 'Este campo es obligatorio' }));
    } else if (valueInstitution.value.id === -1) {
      setErrorsDrop((state) => ({ ...state, institution: 'Este campo es obligatorio' }));
    } else {
      openModalState(nameModals.modalCreateSedeState);
      fetchCreateSede({
        ...data,
        municipioId: valueTown.value.id,
        institucionId: valueInstitution.value.id,
      });
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>CREAR SEDE</h3>
        <p>Por favor ingrese los siguientes datos para crear una sede</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre sede
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            inputHeight="2rem"
            type="text"
            id="name_sede"
            register={register}
          />
          {errors.name_sede && (
            <span role="alert" className={styles.error}>
              {errors.name_sede.message}
            </span>
          )}
        </div>

        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Consecutivo
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            inputHeight="2rem"
            type="text"
            id="consecutivo"
            register={register}
          />
          {errors.consecutivo && (
            <span role="alert" className={styles.error}>
              {errors.consecutivo.message}
            </span>
          )}
        </div>

        <div className={styles.dropdowns}>
          <div>
            <div className={styles.title_input}>
              <span style={{ color: 'red' }}>*</span>Municipio
            </div>
            <div className={styles.modal_dropdown}>
              <storybook.DropdownSearch
                srcDown={iconArrow}
                width="100%"
                height="36px"
                valueSelected={(data) => setValueTown(data)}
                initialValue={valueTown}
                options={listAllTowns.map((data) => ({
                  id: data.idTown,
                  name: data.town_name,
                }))}
                iconSearch={iconSearch}
              />
              {errorsDrop.town && (
                <span role="alert" className={styles.error}>
                  {errorsDrop.town}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className={styles.title_input}>
              <span style={{ color: 'red' }}>*</span>Institución
            </div>
            <div className={styles.modal_dropdown}>
              <storybook.DropdownSearch
                srcDown={iconArrow}
                width="100%"
                height="36px"
                valueSelected={(data) => setValueInstitution(data)}
                initialValue={valueInstitution}
                options={listAllInstitutions.map((data) => ({
                  id: data.idInstitution,
                  name: data.name_institution,
                }))}
                iconSearch={iconSearch}
              />
              {errorsDrop.institution && (
                <span role="alert" className={styles.error}>
                  {errorsDrop.institution}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.modal_buttons}>
          <storybook.ButtonCommon
            text="CANCELAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => openModalState(nameModals.modalCreateSedeState)}
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

export default ModalCreateSede;
