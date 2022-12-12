import requestService from '@service/services/service';
import { columnsTableExecutions, statusAlerts } from '@consts/index';

const createEjecucionSlice = (set, get) => ({
  listAllExecutions: [],
  dataExecutionToEdit: {},
  dataExecutionToDelete: {},
  uploadedFileExecution: null,
  uploadedFileExecutionByInstitution: null,
  searchByColumnExecution: columnsTableExecutions[0],
  viewExecution: 0,
  checkedTableExecutionState: [],
  setCheckedExecutionState: (value) => {
    set({ checkedTableExecutionState: value });
  },
  setViewExecution: (id) => {
    set({ viewExecution: id });
  },
  setDataExecutionToEdit: (data) => {
    set({ dataExecutionToEdit: data });
  },
  setDataExecutionToDelete: (data) => {
    set({ dataExecutionToDelete: data });
  },
  setSearchByExecution: (data) => {
    set({ searchByColumnExecution: data });
  },
  setDataUploadedFileExecution: (file) => {
    set({ uploadedFileExecution: file });
  },
  setDataUploadedFileExecutionByInstitution: (file) => {
    set({ uploadedFileExecutionByInstitution: file });
  },
  fetchAllExecutions: async () => {
    const response = await requestService.getAllExecutions();
    console.log(response);
    set({ listAllExecutions: response.data });
  },
  fetchCreateExecutions: async (dataForm) => {
    try {
      const response = await requestService.setCreateExecution({
        dataBody: {
          name_aplication: dataForm.name_aplication,
          date_start: dataForm.date_start,
          date_end: dataForm.date_end,
          yearId: parseInt(dataForm.yearId),
          description: dataForm.description,
          state: 'ABIERTO',
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La Ejecución se ha guardado exitosamente',
        },
      });
      if (get().uploadedFileExecution) {
        get().fetchUploadFileExecution(response.data.idEjecution);
      }
      if (get().uploadedFileExecutionByInstitution) {
        get().fetchUploadFileExecutionByInstitution(response.data.idEjecution);
      }
      get().fetchAllExecutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchEditExecution: async (dataForm) => {
    const dataExecution = get().dataExecutionToEdit;
    try {
      await requestService.setEditExecution({
        idExecution: parseInt(dataExecution.idEjecution),
        dataBody: {
          name_aplication: dataForm.name_aplication,
          date_start: dataForm.date_start,
          date_end: dataForm.date_end,
          userId: parseInt(dataForm.userId),
          yearId: parseInt(dataForm.yearId),
          description: dataForm.description,
          state: 'ABIERTO',
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La Ejecución se ha actualizado exitosamente',
        },
      });
      if (get().uploadedFileExecution) {
        get().fetchUploadFileExecution(dataExecution.idEjecution);
        get().setDataUploadedFileExecution(null);
      }
      if (get().uploadedFileExecutionByInstitution) {
        get().fetchUploadFileExecutionByInstitution(dataExecution.idEjecution);
        get().setDataUploadedFileExecutionByInstitution(null);
      }
      get().fetchAllExecutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchDeleteExecution: async () => {
    const dataExecution = get().dataExecutionToDelete;
    try {
      await requestService.setDeleteExecution({
        idExecution: dataExecution.idEjecution,
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La Ejecución se ha eliminado exitosamente',
        },
      });
      get().fetchAllExecutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchUploadFileExecution: async (idEjecution) => {
    const uploadedFile = get().uploadedFileExecution;
    const formData = new FormData();

    formData.append('Cuestionario', uploadedFile);

    try {
      const response = get().valueParameter.stateSede
        ? await requestService.setDataFileExecutionMasivoSede({
            dataBody: formData,
            idExecution: idEjecution,
          })
        : await requestService.setDataFileExecutionMasivoInstitution({
            dataBody: formData,
            idExecution: idEjecution,
          });
      console.log(response);
      setTimeout(() => {
        set({
          alertEditStatus: {
            ...statusAlerts.success,
            title: 'Los datos del archivo se han enviado con éxito',
          },
        });
        get().hideAlert();
      }, 5500);
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Response.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        set({
          alertEditStatus: {
            ...statusAlerts.error,
            title: 'Ha ocurrido un error al subir los datos',
          },
        });
        get().hideAlert();
      }, 5500);
    }
  },
  fetchUploadFileExecutionByInstitution: async (idEjecution) => {
    const uploadedFile = get().uploadedFileExecutionByInstitution;
    const formData = new FormData();

    formData.append('Cuestionario', uploadedFile);
    get().valueParameter.stateSede
      ? formData.append('sedeId', get().idSedeExecution.value.id)
      : formData.append('InstitutionId', get().idInstitutionExecution.value.id);

    try {
      const response = get().valueParameter.stateSede
        ? await requestService.setDataFileExecutionBySede({
            dataBody: formData,
            idExecution: idEjecution,
          })
        : await requestService.setDataFileExecutionByInstitution({
            dataBody: formData,
            idExecution: idEjecution,
          });
      console.log(response);
      setTimeout(() => {
        set({
          alertEditStatus: {
            ...statusAlerts.success,
            title: 'Los datos del archivo se han enviado con éxito',
          },
        });
        get().hideAlert();
      }, 5500);
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'ResponseInsitution.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        set({
          alertEditStatus: {
            ...statusAlerts.error,
            title: 'Ha ocurrido un error al subir los datos',
          },
        });
        get().hideAlert();
      }, 5500);
    }
  },
  fetchEditExecutionState: async (dataForm) => {
    // console.log(dataForm);
    try {
      await requestService.setEditExecution({
        idExecution: dataForm.idEjecution,
        dataBody: {
          state: dataForm.state,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El estado se ha actualizado exitosamente',
        },
      });
      get().fetchAllExecutions();
    } catch (err) {
      console.log(err);
      // const errorMessage = err.response.data.error.message;
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'El estado no se ha actualizado correctamente',
        },
      });
    }
    get().hideAlert();
  },
  fetchDownloadExecutionCuestionarios: async (id) => {
    // console.log(dataForm);
    try {
      const response = await requestService.setCuestionariosExecution({
        dataBody: {
          idEjecution: id,
        },
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Cuestionarios.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    } catch (err) {
      console.log(err);
      // const errorMessage = err.response.data.error.message;
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Ha ocurrido un error al descargar el documento',
        },
      });
    }
    get().hideAlert();
  },
  fetchDownloadExecutionReport: async (id) => {
    // console.log(dataForm);
    try {
      const response = await requestService.setDownloadReportExecution({
        dataBody: {
          idEjecution: id,
        },
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Reporte estado indice.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    } catch (err) {
      console.log(err);
      // const errorMessage = err.response.data.error.message;
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Ha ocurrido un error al descargar el documento',
        },
      });
    }
    get().hideAlert();
  },
});

export default createEjecucionSlice;
