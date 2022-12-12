import useStore from '@store/index';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalCreateInstitution.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search.svg';
import useTowns from '@hooks/useTowns';

const ModalCreateInstitution = () => {
  const { fetchCreateInstitution, openModalState } = useStore(
    (state) => ({
      fetchCreateInstitution: state.fetchCreateInstitution,
      openModalState: state.openModalState,
    }),
    shallow,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { towns } = useTowns();

  const [valueMunicipio, setValueMunicipio] = useState({
    value: { id: -1, name: 'Seleccionar' },
    id: 'Seleccionar',
  });

  const [errorsDrop, setErrorsDrop] = useState({
    town: null,
  });

  const onSubmit = async (data) => {
    if (valueMunicipio.value.id === -1) {
      setErrorsDrop((state) => ({ ...state, town: 'Este campo es obligatorio' }));
    } else {
      openModalState(nameModals.modalCreateInstitutionState);
      fetchCreateInstitution({ ...data, municipioId: valueMunicipio.value });
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>CREAR INSTITUCIÓN</h3>
        <p>Por favor ingrese los siguientes datos para crear la institución</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre instituto
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            type="text"
            id="name_institution"
            register={register}
            inputHeight="2rem"
          />
          {errors.name_institution && (
            <span role="alert" className={styles.error}>
              {errors.name_institution.message}
            </span>
          )}
        </div>

        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Municipio
        </div>
        <div className={styles.modal_dropdown}>
          <storybook.DropdownSearch
            srcDown={iconArrow}
            width="100%"
            height="36px"
            valueSelected={(data) => setValueMunicipio(data)}
            initialValue={valueMunicipio}
            options={towns}
            iconSearch={iconSearch}
          />
          {errorsDrop.town && (
            <span role="alert" className={styles.error}>
              {errorsDrop.town}
            </span>
          )}
        </div>

        {/* <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Nombre Sede
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            type="text"
            id="name_headquarter"
            register={register}
            inputHeight="2rem"
          />
          {errors.name_headquarter && (
            <span role="alert" className={styles.error}>
              {errors.name_headquarter.message}
            </span>
          )}
        </div> */}
        <div className={styles.title_input}>
          <span style={{ color: 'red' }}>*</span>Código DANE
        </div>
        <div className={styles.modal_input}>
          <storybook.Input
            isLabel={false}
            inputColor="#a1a1a1"
            placeholder={''}
            type="text"
            id="num_dane"
            register={register}
            inputHeight="2rem"
          />
          {errors.num_dane && (
            <span role="alert" className={styles.error}>
              {errors.num_dane.message}
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
            passedFunction={() => openModalState(nameModals.modalCreateInstitutionState)}
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

export default ModalCreateInstitution;
