import requestService from '@service/services/service';
import { columnsTableAreas, statusAlerts } from '@consts/index';

const createAreaSlice = (set, get) => ({
  listAllAreas: [],
  dataAreaToEdit: {},
  dataAreaToDelete: {},
  searchByColumnArea: columnsTableAreas[0],
  viewExecution: 0,
  setDataAreaToEdit: (data) => {
    set({ dataAreaToEdit: data });
  },
  setDataAreaToDelete: (data) => {
    set({ dataAreaToDelete: data });
  },
  setSearchByArea: (data) => {
    set({ searchByColumnArea: data });
  },
  fetchAllAreas: async () => {
    const response = await requestService.getAllAreas();
    set({ listAllAreas: response.data });
  },
  fetchCreateAreas: async (dataForm) => {
    try {
      await requestService.setCreateExecution({
        dataBody: {
          name_aplication: dataForm.name_aplication,
          date_start: dataForm.date_start,
          date_end: dataForm.date_end,
          userId: parseInt(dataForm.userId),
          yearId: parseInt(dataForm.yearId),
          //   description: dataForm.description,
          state: 'Abierto',
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La Ejecución se ha guardado exitosamente',
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
  fetchEditAreas: async (dataForm) => {
    const dataArea = get().dataAreaToEdit;
    try {
      await requestService.setEditArea({
        idArea: parseInt(dataArea.idArea),
        dataBody: {
          name_area: dataForm.name_area,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El área se ha actualizado exitosamente',
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
  fetchDeleteAreas: async () => {
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
});

export default createAreaSlice;
