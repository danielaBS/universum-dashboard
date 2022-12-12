import useStore from '@store/index';
import { filtersInstitutionOptions, nameModals } from '@consts/index';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalDownloadInstitution.module.scss';
import { useForm } from 'react-hook-form';
import useDataFiltersForm from '@hooks/useDataFiltersForm';
import useYears from '@hooks/useYears';
import FilterFormBasicData from '@common/main/toolsManagement/filterTools/filterFormBasicData';
// import { useEffect } from 'react';

const ModalDownloadInstitution = () => {
  const {
    openModalState,
    fetchDownloadInstitution,
    yearData,
    executionData,
    dataInstitutionToEdit,
    downloadType,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      fetchDownloadInstitution: state.fetchDownloadInstitution,
      yearData: state.yearData,
      executionData: state.executionData,
      dataInstitutionToEdit: state.dataInstitutionToEdit,
      downloadType: state.downloadType,
    }),
    shallow,
  );
  const { years } = useYears();
  const { formEjecuciones } = useDataFiltersForm();

  const { handleSubmit } = useForm();

  const [errorsDrop, setErrorsDrop] = useState({
    execution: null,
  });

  const onSubmit = async () => {
    if (yearData === null) {
      setErrorsDrop((state) => ({ ...state, year: 'Llene por favor todos los campos' }));
    } else if (executionData === null) {
      setErrorsDrop((state) => ({ ...state, execution: 'Llene por favor todos los campos' }));
    } else {
      handleDownload();
      openModalState(nameModals.modalDownloadInstitutionState);
    }
  };

  const handleDownload = () => {
    const idYear = yearData.id;
    const idEjecution = executionData.id;
    const idInstitution = dataInstitutionToEdit.idInstitution;
    fetchDownloadInstitution({ idYear, idEjecution, idInstitution });
  };

  const renderOptions = (id) => {
    const SET_OPTIONS = {
      0: years,
      1: formEjecuciones,
    };
    return SET_OPTIONS[id] ? SET_OPTIONS[id] : null;
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        {downloadType === 0 && <h3>Descargar índice de inclusión</h3>}
        {downloadType === 1 && <h3>Descargar cuestionarios</h3>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_row}>
          <div className={styles.title_text}>ID Institución</div>
          <div>{dataInstitutionToEdit.idInstitution}</div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.title_text}>Nombre institución</div>
          <div>{dataInstitutionToEdit.name_institution}</div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.title_text}>DANE</div>
          <div>{dataInstitutionToEdit.num_dane}</div>
        </div>

        <p>Por favor seleccione año y ejecución para descargar el cuestionario </p>
        <div className={styles.dropdowns}>
          {filtersInstitutionOptions.map((data, index) => (
            <div className={styles.basic__data_input_drop} key={index}>
              <span style={{ color: 'red' }}>*</span>
              {index === 0 && <div>Año</div>}
              {index === 1 && <div>Ejecución</div>}
              <FilterFormBasicData
                title={data.name}
                dropdownText={'Todos'}
                options={renderOptions(data.id) || []}
                type={data.id}
              />
            </div>
          ))}
          {errorsDrop.year && (
            <span role="alert" className={styles.error}>
              {errorsDrop.year}
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
            passedFunction={() => openModalState(nameModals.modalDownloadInstitutionState)}
          />
          <storybook.ButtonCommon
            text="DESCARGAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            type="submit"
            passedFunction={() => handleDownload()}
          />
        </div>
      </form>
    </div>
  );
};

export default ModalDownloadInstitution;
