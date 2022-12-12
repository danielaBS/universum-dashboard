import useStore from '@store/index';
import { nameModals } from '@consts/index';
import React from 'react';
import shallow from 'zustand/shallow';
import storybook from '@talentumlab/storybook-design-system';
import styles from './modalUploadUserFile.module.scss';
import { useForm } from 'react-hook-form';
import UploadFileData from '@common/uploadFileData/uploadFileData';
// import { useEffect } from 'react';

const ModalUploadUserFile = () => {
  const {
    openModalState,
    valueParameter,
    setDataUploadedFileUserByInstitution,
    setDataUploadedFileUserBySede,
    fetchUploadFileUser,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      valueParameter: state.valueParameter,
      setDataUploadedFileUserByInstitution: state.setDataUploadedFileUserByInstitution,
      setDataUploadedFileUserBySede: state.setDataUploadedFileUserBySede,
      fetchUploadFileUser: state.fetchUploadFileUser,
    }),
    shallow,
  );

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    fetchUploadFileUser();
    openModalState(nameModals.modalUploadUserFile);
  };

  return (
    <div className={styles.modal_body}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Cargar archivos</div>
        <div className={styles.add__upload_institution}>
          <div>Cargar archivos</div>
          {valueParameter.stateSede && (
            <div className={styles.add__upload_file}>
              <UploadFileData setDataUploaded={setDataUploadedFileUserBySede} />
            </div>
          )}
          {!valueParameter.stateSede && (
            <div className={styles.add__upload_file}>
              <UploadFileData setDataUploaded={setDataUploadedFileUserByInstitution} />
            </div>
          )}
          <div className={styles.add__upload_template}>
            Por favor use la siguiente plantilla para completar esta acción.{' '}
            {valueParameter.stateSede && (
              <a href="/files/usuariosSede.xlsx" download>
                Descargar aquí
              </a>
            )}
            {!valueParameter.stateSede && (
              <a href="/files/usuariosInstitucion.xlsx" download>
                Descargar aquí
              </a>
            )}
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
            passedFunction={() => openModalState(nameModals.modalUploadUserFile)}
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

export default ModalUploadUserFile;
