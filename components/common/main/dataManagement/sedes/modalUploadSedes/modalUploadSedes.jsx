import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalUploadSedes.module.scss';
import { useForm } from 'react-hook-form';
import UploadFileData from '@common/uploadFileData/uploadFileData';
// import { useEffect } from 'react';

const ModalUploadSedes = () => {
  const { setDataUploadedFileSedeData, openModalState, uploadedFileSedeData, fetchUploadFileSede } =
    useStore(
      (state) => ({
        setDataUploadedFileSedeData: state.setDataUploadedFileSedeData,
        openModalState: state.openModalState,
        listAllTowns: state.listAllTowns,
        listAllInstitutions: state.listAllInstitutions,
        uploadedFileSedeData: state.uploadedFileSedeData,
        fetchUploadFileSede: state.fetchUploadFileSede,
      }),
      shallow,
    );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (uploadedFileSedeData) {
      fetchUploadFileSede();
      setDataUploadedFileSedeData(null);
      openModalState(nameModals.modalUploadSedeState);
    }
  };

  return (
    <div className={styles.modal_body}>
      <div className={styles.title}>
        <h3>SUBIR SEDE MASIVAMENTE</h3>
        <p>Por favor suba el archivo para crear sedes de manera masiva</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.add__upload_institution}>
          <div>Cargar archivos</div>
          <div className={styles.add__upload_file}>
            <UploadFileData setDataUploaded={setDataUploadedFileSedeData} />
          </div>
          <div className={styles.add__upload_template}>
            Por favor use la siguiente plantilla para completar esta acción.{' '}
            <a href="/files/sedes.xlsx" download>
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
            passedFunction={() => openModalState(nameModals.modalUploadSedeState)}
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

export default ModalUploadSedes;
