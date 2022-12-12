import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalUploadTowns.module.scss';
import { useForm } from 'react-hook-form';
import UploadFileData from '@common/uploadFileData/uploadFileData';
// import { useEffect } from 'react';

const ModalUploadTowns = () => {
  const { setDataUploadedFileTownData, openModalState, uploadedFileTownData, fetchUploadFileTown } =
    useStore(
      (state) => ({
        setDataUploadedFileTownData: state.setDataUploadedFileTownData,
        openModalState: state.openModalState,
        listAllTowns: state.listAllTowns,
        listAllInstitutions: state.listAllInstitutions,
        uploadedFileTownData: state.uploadedFileTownData,
        fetchUploadFileTown: state.fetchUploadFileTown,
      }),
      shallow,
    );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (uploadedFileTownData) {
      fetchUploadFileTown();
      setDataUploadedFileTownData(null);
      openModalState(nameModals.modalUploadTownState);
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>SUBIR MUNICIPIO MASIVAMENTE</h3>
        <p>Por favor suba el archivo para crear municipios de manera masiva</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.add__upload_institution}>
          <div>Cargar archivos</div>
          <div className={styles.add__upload_file}>
            <UploadFileData setDataUploaded={setDataUploadedFileTownData} />
          </div>
          <div className={styles.add__upload_template}>
            Por favor use la siguiente plantilla para completar esta acción.{' '}
            <a href="/files/municipios.xlsx" download>
              Descargar aquí
            </a>
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
            passedFunction={() => openModalState(nameModals.modalUploadTownState)}
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

export default ModalUploadTowns;
