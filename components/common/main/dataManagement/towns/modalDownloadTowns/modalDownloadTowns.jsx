import useStore from '@store/index';
import { filtersTownOptions, nameModals } from '@consts/index';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalDownloadTowns.module.scss';
import { useForm } from 'react-hook-form';
import useDataFiltersForm from '@hooks/useDataFiltersForm';
import useYears from '@hooks/useYears';
import FilterFormBasicData from '@common/main/toolsManagement/filterTools/filterFormBasicData';
// import { useEffect } from 'react';

const ModalDownloadTowns = () => {
  const { openModalState, fetchDownloadTownZip, dataTownToEdit, yearData, executionData } =
    useStore(
      (state) => ({
        openModalState: state.openModalState,
        fetchDownloadTownZip: state.fetchDownloadTownZip,
        dataTownToEdit: state.dataTownToEdit,
        yearData: state.yearData,
        executionData: state.executionData,
      }),
      shallow,
    );
  const { years } = useYears();
  const { formEjecuciones } = useDataFiltersForm();

  const { handleSubmit } = useForm();

  const [errorsDrop, setErrorsDrop] = useState({
    year: null,
    execution: null,
  });

  const onSubmit = async () => {
    if (yearData === null) {
      setErrorsDrop((state) => ({ ...state, year: 'Llene por favor todos los campos' }));
    } else if (executionData === null) {
      setErrorsDrop((state) => ({ ...state, execution: 'Llene por favor todos los campos' }));
    } else {
      handleDownload();
      openModalState(nameModals.modalDownloadTownState);
    }
  };

  const handleDownload = () => {
    const idYear = yearData.id;
    const idEjecution = executionData.id;
    const idTown = dataTownToEdit.idTown;
    fetchDownloadTownZip({ idYear, idEjecution, idTown });
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
        <h3>Descargar índice de inclusión</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_row}>
          <div className={styles.title_text}>ID Municipio</div>
          <div>{dataTownToEdit.idTown}</div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.title_text}>Nombre Municipio</div>
          <div>{dataTownToEdit.town_name}</div>
        </div>
        <p>Por favor seleccione año y ejecución para descargar el cuestionario </p>
        <div className={styles.dropdowns}>
          {filtersTownOptions.map((data, index) => (
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
            passedFunction={() => openModalState(nameModals.modalDownloadTownState)}
          />
          <storybook.ButtonCommon
            text="DESCARGAR"
            width="8rem"
            height="36px"
            borderradius="5px"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ModalDownloadTowns;
