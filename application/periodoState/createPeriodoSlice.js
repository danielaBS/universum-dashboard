import requestService from '@service/services/service';
import { columnsTableYear, statusAlerts } from '@consts/index';
// import { periods } from '@views/consts/listTemporal';

const createPeriodoSlice = (set, get) => ({
  listAllPeriodos: [],
  listAllPeriodosGeneral: [],
  dataYearToEdit: {},
  dataYearToDelete: {},
  alertEditStatus: null,
  searchByColumnYear: columnsTableYear[0],
  hideAlert: () => {
    setTimeout(() => {
      set({ alertEditStatus: null });
    }, 5000);
  },
  fetchAllYears: async () => {
    const response = await requestService.getAllYears();
    set({ listAllPeriodos: response.data });
  },
  fetchAllYearsGeneral: async () => {
    const response = await requestService.getAllYears();
    set({ listAllPeriodosGeneral: response.data });
  },
  setDataYearToEdit: (data) => {
    set({ dataYearToEdit: data });
  },
  setDataYearToDelete: (data) => {
    set({ dataYearToDelete: data });
  },
  setSearchByYear: (data) => {
    set({ searchByColumnYear: data });
  },
  fetchEditYear: async (dataForm) => {
    // console.log(get().dataYearToEdit);
    const dataYear = get().dataYearToEdit;
    try {
      const response = await requestService.setEditYear({
        idYear: parseInt(dataYear.idYear),
        dataBody: { title: parseInt(dataForm.title), description: dataForm.description },
      });
      set({ alertEditStatus: { ...statusAlerts.success, title: response.data } });
      get().fetchAllYears();
    } catch (err) {
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchPostYear: async (dataForm) => {
    try {
      await requestService.setPostYear({
        dataBody: { title: parseInt(dataForm.title), description: dataForm.description.toString() },
      });
      set({ alertEditStatus: { ...statusAlerts.success, title: 'Año creado con éxito' } });
      get().fetchAllYears();
    } catch (err) {
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchDeleteYear: async () => {
    const dataYear = get().dataYearToDelete;

    try {
      await requestService.setDeleteYear({
        idYear: dataYear.idYear,
      });
      set({
        alertEditStatus: { ...statusAlerts.success, title: 'Se ha borrado el año con éxito' },
      });
      get().fetchAllYears();
    } catch (error) {
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Este año contiene ejecuciones asociadas',
        },
      });
      console.log(err);
    }

    get().hideAlert();
  },
  fetchYearById: async (idYear) => {
    return await requestService.getYearById({ idYear });
  },
});

export default createPeriodoSlice;
