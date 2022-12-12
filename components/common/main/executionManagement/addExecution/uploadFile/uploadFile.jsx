import React from 'react';
import styles from './uploadFile.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import { useState, useEffect } from 'react';
const iconExcel = '/images/excel.svg';
import ProgressBar from '@layout/progressBar/progressBar';
import shallow from 'zustand/shallow';
import useStore from '@store/index';

const UploadFile = () => {
  const { setDataUploadedFileExecution, idSedeExecution, dataExecutionToEdit, viewExecution } =
    useStore(
      (state) => ({
        setDataUploadedFileExecution: state.setDataUploadedFileExecution,
        idSedeExecution: state.idSedeExecution,
        dataExecutionToEdit: state.dataExecutionToEdit,
        viewExecution: state.viewExecution,
      }),
      shallow,
    );
  const [selectedFile, setSelectedFile] = useState('');
  const [disabledFile, setDisabledFile] = useState(false);

  useEffect(() => {
    if (viewExecution === 2) {
      if (idSedeExecution.value.id && dataExecutionToEdit.state.toLowerCase() === 'abierto') {
        setDisabledFile(true);
      } else {
        setDisabledFile(false);
      }
    } else if (viewExecution === 1) {
      setDisabledFile(true);
    }
  }, [dataExecutionToEdit, idSedeExecution, viewExecution]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setDataUploadedFileExecution(event.target.files[0]);
    console.log('Archivo seleccionado y guardado');
  };

  return (
    <div className={styles.content__upload_button}>
      <div className={styles.drag_drop_files}>
        <input
          className={styles.input_upload}
          type="file"
          name=""
          id=""
          onChange={handleFileSelect}
          disabled={disabledFile ? false : true}
          style={
            disabledFile
              ? { opacity: '1', cursor: 'pointer' }
              : { opacity: '0.2', cursor: 'default' }
          }
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

export default UploadFile;
