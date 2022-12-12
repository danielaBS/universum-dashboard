import requestService from '@service/services/service';
import { columnsTableSedes, statusAlerts } from '@consts/index';

const createSedeSlice = (set, get) => ({
  listAllSedes: [],
  dataSedeToEdit: {},
  dataSedeToDelete: {},
  searchByColumnSede: columnsTableSedes[0],
  uploadedFileSedeData: null,
  setDataUploadedFileSedeData: (file) => {
    set({ uploadedFileSedeData: file });
  },
  setDataSedeToEdit: (data) => {
    set({ dataSedeToEdit: data });
  },
  setDataSedeToDelete: (data) => {
    set({ dataSedeToDelete: data });
  },
  setSearchBySede: (data) => {
    set({ searchByColumnSede: data });
  },
  fetchAllSedes: async () => {
    const response = await requestService.getAllSedes();
    set({ listAllSedes: response.data });
  },
  fetchCreateSede: async (dataForm) => {
    try {
      await requestService.setCreateSede({
        dataBody: {
          name_sede: dataForm.name_sede,
          consecutivo: dataForm.consecutivo,
          municipioId: dataForm.municipioId,
          institucionId: dataForm.institucionId,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La sede se ha guardado exitosamente',
        },
      });
      get().fetchAllSedes();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchEditSede: async (dataForm) => {
    const dataSede = get().dataSedeToEdit;
    try {
      await requestService.setEditSede({
        idSede: parseInt(dataSede.idSede),
        dataBody: {
          name_sede: dataForm.name_sede,
          consecutivo: dataForm.consecutivo,
          municipioId: dataForm.municipioId,
          institucionId: dataForm.institucionId,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La sede se ha actualizado exitosamente',
        },
      });
      get().fetchAllSedes();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchDeleteSede: async () => {
    const dataSede = get().dataSedeToDelete;
    try {
      await requestService.setDeleteSede({
        idSede: dataSede.idSede,
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La sede se ha eliminado exitosamente',
        },
      });
      get().fetchAllSedes();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchUploadFileSede: async () => {
    const uploadedFile = get().uploadedFileSedeData;
    const formData = new FormData();

    formData.append('file', uploadedFile);

    try {
      const response = await requestService.setDataFileSedeData({
        dataBody: formData,
      });
      console.log(response);

      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'Los datos del archivo se han enviado con éxito',
        },
      });

      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'FeedbackSedes.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
      get().fetchAllSedes();
      get().hideAlert();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Ha ocurrido un error, Solo se permite el archivo con nombre sedes.xlsx',
        },
      });
      get().hideAlert();
    }
  },
  fetchDownloadSede: async ({ idYear, idEjecution, idSede }) => {
    const downloadType = get().downloadType;
    if (downloadType === 0) {
      try {
        const response = await requestService.setIndiceStateSede({
          dataBody: {
            idYear: idYear,
            idEjecution: idEjecution,
            idSede: idSede,
          },
        });
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Response.pdf');
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (err) {
        console.log(err);
        set({
          alertEditStatus: {
            ...statusAlerts.error,
            title: 'Ha ocurrido un error al descargar el documento',
          },
        });
        get().hideAlert();
      }
    } else if (downloadType === 1) {
      try {
        const response = await requestService.setSedeCuestionaire({
          dataBody: {
            idEjecution: idEjecution,
            idSede: idSede,
          },
        });
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Response.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (err) {
        console.log(err);
        set({
          alertEditStatus: {
            ...statusAlerts.error,
            title: 'Ha ocurrido un error al descargar el documento',
          },
        });
        get().hideAlert();
      }
    }
  },
});

export default createSedeSlice;
