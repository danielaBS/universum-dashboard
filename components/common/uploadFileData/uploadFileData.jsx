import React from 'react';
import styles from './uploadFileData.module.scss';
import storybook from '@talentumlab/storybook-design-system';
import { useState } from 'react';
const iconExcel = '/images/excel.svg';
import ProgressBar from '@layout/progressBar/progressBar';
// import shallow from 'zustand/shallow';
// import useStore from '@store/index';

const UploadFileData = ({ setDataUploaded }) => {
  //   const { setDataUploadedFileExecutionByInstitution } = useStore(
  //     (state) => ({
  //       setDataUploadedFileExecutionByInstitution: state.setDataUploadedFileExecutionByInstitution,
  //     }),
  //     shallow,
  //   );
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setDataUploaded(event.target.files[0]);
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

export default UploadFileData;
