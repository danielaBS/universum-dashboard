import requestService from '@service/services/service';
import { columnsTableInstitutions, statusAlerts } from '@consts/index';

const createInstitucionSlice = (set, get) => ({
  listAllInstitutions: [],
  dataInstitutionToEdit: {},
  dataInstitutionToDelete: {},
  searchByColumnInstitution: columnsTableInstitutions[0],
  uploadedFileInstitutionData: null,
  downloadType: null,
  setDataUploadedFileInstitutionData: (file) => {
    set({ uploadedFileInstitutionData: file });
  },
  setDataInstitutionToEdit: (data) => {
    set({ dataInstitutionToEdit: data });
  },
  setDataInstitutionToDelete: (data) => {
    set({ dataInstitutionToDelete: data });
  },
  setSearchByInstitution: (data) => {
    set({ searchByColumnInstitution: data });
  },
  setDownloadType: (data) => {
    set({ downloadType: data });
  },
  fetchAllInstitutions: async () => {
    const response = await requestService.getAllInstitutions(); // CAMBIAR
    set({ listAllInstitutions: response.data });
  },
  fetchCreateInstitution: async (dataForm) => {
    try {
      await requestService.setCreateInstitution({
        dataBody: {
          institucion: {
            name_institution: dataForm.name_institution,
            num_dane: dataForm.num_dane,
          },
          municipioId: parseInt(dataForm.municipioId.id),
          sedeCreated: get().valueParameter.stateSede ? 0 : -1,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La institución se ha guardado exitosamente',
        },
      });
      get().fetchAllInstitutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchEditInstitution: async (dataForm) => {
    const dataInstitution = get().dataInstitutionToEdit;
    try {
      await requestService.setEditInstitution({
        idInstitution: parseInt(dataInstitution.idInstitution),
        dataBody: {
          name_institution: dataForm.name_institution,
          municipioId: parseInt(dataForm.municipioId),
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La institución se ha actualizado exitosamente',
        },
      });
      get().fetchAllInstitutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
    get().fetchAllInstitutions();
  },
  fetchDeleteInstitution: async () => {
    const dataInstitution = get().dataInstitutionToDelete;
    try {
      await requestService.setDeleteInstitution({
        idInstitution: dataInstitution.idInstitution,
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La institución se ha eliminado exitosamente',
        },
      });
      get().fetchAllInstitutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchUploadFileInstitution: async () => {
    const uploadedFile = get().uploadedFileInstitutionData;
    const formData = new FormData();

    formData.append('file', uploadedFile);
    get().valueParameter.stateSede
      ? formData.append('sedeCreated', true)
      : formData.append('sedeCreated', false);

    try {
      const response = await requestService.setDataFileInstitutionData({
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
      fileLink.setAttribute('download', 'FeedbackInstitutions.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
      get().fetchAllInstitutions();
      get().hideAlert();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Ha ocurrido un error, Solo se permite el archivo con nombre instituciones.xlsx',
        },
      });
      get().hideAlert();
    }
  },
  fetchDownloadInstitution: async ({ idYear, idEjecution, idInstitution }) => {
    const downloadType = get().downloadType;
    if (downloadType === 0) {
      try {
        const response = await requestService.setIndiceStateInstitution({
          dataBody: {
            idYear: idYear,
            idEjecution: idEjecution,
            idInstitution: idInstitution,
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
        const response = await requestService.setInstitutionCuestionaire({
          dataBody: {
            idEjecution: idEjecution,
            idInstitution: idInstitution,
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

export default createInstitucionSlice;
