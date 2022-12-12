import requestService from '@service/services/service';
import { columnsTableTowns, statusAlerts } from '@consts/index';

const createTownSlice = (set, get) => ({
  listAllTowns: [],
  dataTownToEdit: {},
  dataTownToDelete: {},
  searchByColumnTown: columnsTableTowns[0],
  uploadedFileTownData: null,
  setDataUploadedFileTownData: (file) => {
    set({ uploadedFileTownData: file });
  },
  setDataTownToEdit: (data) => {
    set({ dataTownToEdit: data });
  },
  setDataTownToDelete: (data) => {
    set({ dataTownToDelete: data });
  },
  setSearchByTown: (data) => {
    set({ searchByColumnTown: data });
  },
  fetchAllTowns: async () => {
    const response = await requestService.getAllTowns();
    set({ listAllTowns: response.data });
  },
  fetchCreateTown: async (dataForm) => {
    try {
      await requestService.setCreateTown({
        dataBody: {
          town_name: dataForm.town_name,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El municipio se ha guardado exitosamente',
        },
      });
      get().fetchAllTowns();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchEditTown: async (dataForm) => {
    const dataTown = get().dataTownToEdit;
    try {
      await requestService.setEditTown({
        idTown: parseInt(dataTown.idTown),
        dataBody: {
          town_name: dataForm.town_name,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El municipio se ha actualizado exitosamente',
        },
      });
      get().fetchAllTowns();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchDeleteTown: async () => {
    const dataTown = get().dataTownToDelete;
    try {
      await requestService.setDeleteTown({
        idTown: dataTown.idTown,
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El municipio se ha eliminado exitosamente',
        },
      });
      get().fetchAllTowns();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchUploadFileTown: async () => {
    const uploadedFile = get().uploadedFileTownData;
    const formData = new FormData();

    formData.append('file', uploadedFile);

    try {
      const response = await requestService.setDataFileTownData({
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
      fileLink.setAttribute('download', 'FeedbackMunicipios.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
      get().fetchAllTowns();
      get().hideAlert();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Ha ocurrido un error, Solo se permite el archivo con nombre municipios.xlsx',
        },
      });
      get().hideAlert();
    }
  },
  fetchDownloadTownZip: async ({ idYear, idEjecution, idTown }) => {
    try {
      const response = await requestService.setTownZip({
        dataBody: {
          idYear: idYear,
          idEjecution: idEjecution,
          idTown: idTown,
        },
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Response.zip');
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
    }
    get().hideAlert();
  },
});

export default createTownSlice;
