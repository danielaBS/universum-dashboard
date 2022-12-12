import React, { useCallback, useEffect } from 'react';
import styles from './uploadFileInstitution.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import { useState } from 'react';
const iconExcel = '/images/excel.svg';
import ProgressBar from '@layout/progressBar/progressBar';
import shallow from 'zustand/shallow';
import useStore from '@store/index';

const UploadFileInstitution = () => {
  const {
    setDataUploadedFileExecutionByInstitution,
    idSedeExecution,
    dataExecutionToEdit,
    viewExecution,
    idInstitutionExecution,
    valueParameter,
  } = useStore(
    (state) => ({
      setDataUploadedFileExecutionByInstitution: state.setDataUploadedFileExecutionByInstitution,
      idSedeExecution: state.idSedeExecution,
      dataExecutionToEdit: state.dataExecutionToEdit,
      viewExecution: state.viewExecution,
      idInstitutionExecution: state.idInstitutionExecution,
      valueParameter: state.valueParameter,
    }),
    shallow,
  );
  const [selectedFile, setSelectedFile] = useState('');
  const [disabledFile, setDisabledFile] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setDataUploadedFileExecutionByInstitution(event.target.files[0]);
    console.log('Archivo seleccionado y guardado');
  };
  // !get().valueParameter.stateSede;
  const disableSedeActive = useCallback(() => {
    let idToUnlock = valueParameter.stateSede
      ? idSedeExecution.value.id
      : idInstitutionExecution.value.id;

    if (viewExecution === 2) {
      if (idToUnlock && dataExecutionToEdit.state.toLowerCase() === 'abierto') {
        setDisabledFile(true);
      } else {
        setDisabledFile(false);
      }
    } else if (viewExecution === 1) {
      if (idToUnlock) {
        setDisabledFile(true);
      } else {
        setDisabledFile(false);
      }
    }
  }, [dataExecutionToEdit, idSedeExecution, idInstitutionExecution, viewExecution, valueParameter]);

  useEffect(() => {
    disableSedeActive();
  }, [disableSedeActive]);

  return (
    <div className={styles.content__upload_button}>
      <div className={styles.drag_drop_files}>
        <input
          className={styles.input_upload}
          type="file"
          name=""
          id=""
          disabled={disabledFile ? false : true}
          style={
            disabledFile
              ? { opacity: '1', cursor: 'pointer' }
              : { opacity: '0.2', cursor: 'default' }
          }
          onChange={handleFileSelect}
        />
      </div>
      {selectedFile !== '' && (
        <div className={styles.view__file}>
          <div className={styles.view__file_icon}>
            <storybook.Image src={iconExcel} />
          </div>
          <div className={styles.view__file_progress_bar}>
            <div>{selectedFile.name || ''}</div>
            <div className={styles.bar}>{selectedFile.name && <ProgressBar />}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFileInstitution;
