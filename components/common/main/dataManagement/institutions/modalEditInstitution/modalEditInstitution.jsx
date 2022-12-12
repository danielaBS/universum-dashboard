import useStore from '@store/index';
import { nameModals } from '@consts/index';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalEditInstitution.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search.svg';
import useTowns from '@hooks/useTowns';

const ModalEditInstitution = () => {
  const { fetchEditInstitution, openModalState, dataInstitutionToEdit } = useStore(
    (state) => ({
      fetchEditInstitution: state.fetchEditInstitution,
      openModalState: state.openModalState,
      dataInstitutionToEdit: state.dataInstitutionToEdit,
    }),
    shallow,
  );

  const { towns } = useTowns();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [valueMunicipio, setValueMunicipio] = useState({
    value: { id: -1, name: 'Seleccionar' },
    id: 'Seleccionar',
  });

  useEffect(() => {
    const setValuesInUpdate = () => {
      setValue('name_institution', dataInstitutionToEdit.name_institution);
      // setValueMunicipio({
      //   value: {
      //     id: dataInstitutionToEdit.idTown,
      //     name: dataInstitutionToEdit.town_name,
      //   },
      //   id: dataInstitutionToEdit.idTown,
      // });
    };
    setValuesInUpdate();
  }, [dataInstitutionToEdit, setValue]);

  const onSubmit = async (data) => {
    openModalState(nameModals.modalEditInstitutionState);
    fetchEditInstitution({ ...data, municipioId: valueMunicipio.value.id });
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>EDITAR INSTITUCIÓN</h3>
        <p>Por favor ingrese los siguientes datos para editar la institución</p>
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
          {errors.municipio && (
            <span role="alert" className={styles.error}>
              {errors.municipio.message}
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
            passedFunction={() => openModalState(nameModals.modalEditInstitutionState)}
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

export default ModalEditInstitution;
