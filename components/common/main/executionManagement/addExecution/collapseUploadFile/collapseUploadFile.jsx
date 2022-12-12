import React, { useState } from 'react';
import styles from './collapseUploadFile.module.scss';
const iconArrow = '/icons/arrow_dropdown.svg';
import storybook from '@talentumlab/storybook-design-system';
import UploadFileInstitution from '../uploadFileInstitution/uploadFileInstitution';
import FilterFileExecution from './filterFileExecution/filterFileExecution';
import { filtersExecution } from '@consts/filters';
import useDataFiltersExecution from '@hooks/useDataFiltersExecution';
import UploadFile from '../uploadFile/uploadFile';
import shallow from 'zustand/shallow';
import useStore from '@store/index';

const CollapseUploadFile = () => {
  const { executionDepartments, executionTownsBy, executionInstitutions, executionSedes } =
    useDataFiltersExecution();

  const { isLoadIndexBySedeExecution, isBulkLoadExecution, valueParameter } = useStore(
    (state) => ({
      isLoadIndexBySedeExecution: state.isLoadIndexBySedeExecution,
      isBulkLoadExecution: state.isBulkLoadExecution,
      valueParameter: state.valueParameter,
    }),
    shallow,
  );

  const renderOptions = (id) => {
    const SET_OPTIONS = {
      2: executionDepartments,
      3: executionTownsBy,
      4: executionInstitutions,
      5: executionSedes,
    };
    return SET_OPTIONS[id] ? SET_OPTIONS[id] : null;
  };
  const [controlCollapse, setControlCollapse] = useState(0);
  return (
    <div className={styles.container__collapse}>
      {isLoadIndexBySedeExecution && (
        <>
          <div className={styles.collapse} onClick={() => setControlCollapse(0)}>
            <p>Cargar Institución Individual</p>
            <storybook.Image src={iconArrow} />
          </div>
          {/* {controlCollapse === 0 && ( */}
          <div
            className={styles.collapse_content}
            style={controlCollapse === 0 ? { height: 'auto' } : { height: '0rem', padding: '0rem' }}
          >
            <p>Esta opción le permite añadir una institución de manera individual</p>
            <div className={styles.filters__content}>
              {filtersExecution
                .filter((info) => {
                  return valueParameter.stateSede ? info : info.name !== 'Sedes';
                })
                .map((data, index) => (
                  <FilterFileExecution
                    key={index}
                    title={data.name}
                    dropdownText={'Todos'}
                    options={renderOptions(data.id) || []}
                    type={data.id}
                  />
                ))}
              {/* <section className={styles.actions__filters}>
              <storybook.ButtonCommon
                text="LIMPIAR"
                width="8rem"
                height="36px"
                borderradius="5px"
                passedFunction={() => cleanFiltersTool()}
                showIcon
                iconButton={iconRefresh}
              />
            </section> */}
            </div>
            <div className={styles.add__upload_institution}>
              <div>Cargar archivos</div>
              <div className={styles.add__upload_file}>
                <UploadFileInstitution />
              </div>
              <div className={styles.add__upload_template}>
                Por favor use la siguiente plantilla para completar esta acción.{' '}
                <a
                  href={
                    valueParameter.stateSede
                      ? '/files/cuestionarioSede.xlsx'
                      : '/files/cuestionarioInstitucion.xlsx'
                  }
                  download
                >
                  Descargar aquí
                </a>
              </div>
            </div>
          </div>
        </>
      )}
      {isBulkLoadExecution && (
        <>
          <div className={styles.collapse} onClick={() => setControlCollapse(1)}>
            <p>Cargar Institución Masiva</p>
            <storybook.Image src={iconArrow} />
          </div>
          {/* {controlCollapse === 1 && ( */}
          <div
            className={styles.collapse_content}
            style={controlCollapse === 1 ? { height: 'auto' } : { height: '0rem', padding: '0rem' }}
          >
            <p>Esta opción le permite añadir varias instituciones masivamente</p>
            <div className={styles.add__upload_institution}>
              <div>Cargar archivos</div>
              <div className={styles.add__upload_file}>
                <UploadFile />
              </div>
              <div className={styles.add__upload_template}>
                Por favor use la siguiente plantilla para completar esta acción.{' '}
                <a
                  href={
                    valueParameter.stateSede
                      ? '/files/cuestionario.xlsx'
                      : '/files/cuestionarioMasivo.xlsx'
                  }
                  download
                >
                  Descargar aquí
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollapseUploadFile;
